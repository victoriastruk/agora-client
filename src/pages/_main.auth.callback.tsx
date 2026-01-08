import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { logger } from "../shared/services/logger";
import { env } from "../shared/utils/env";
import { Spinner } from "../shared/ui";
import { sessionKeys } from "../entities/session/api/query-keys";

export const Route = createFileRoute("/_main/auth/callback")({
  component: OAuthCallbackPage,
  validateSearch: (search) => ({
    code: (search.code as string) || undefined,
    error: (search.error as string) || undefined,
    state: (search.state as string) || undefined,
  }),
});

function OAuthCallbackPage() {
  const { code, state, error } = useSearch({
    from: "/_main/auth/callback",
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (error) {
      logger.error("OAuth error received", { error });
      navigate({ replace: true, to: "/" });
      return;
    }

    if (!code || !state) {
      navigate({ replace: true, to: "/" });
      return;
    }

    const storedState = localStorage.getItem("oauth_state");
    if (storedState !== state) {
      logger.error("OAuth state mismatch");
      navigate({ replace: true, to: "/" });
      return;
    }

    localStorage.removeItem("oauth_state");

    const callbackUrl = new URL("/auth/google/callback", env.BACKEND_URL);
    callbackUrl.searchParams.set("code", code);
    callbackUrl.searchParams.set("state", state);

    const completeOAuth = async () => {
      try {
        const response = await fetch(callbackUrl.toString(), {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`OAuth callback failed: ${response.status}`);
        }

        import("../entities/session/model/session-store").then(({ sessionActions }) => {
          sessionActions.setLoading(true);
        });

        await queryClient.invalidateQueries({
          queryKey: sessionKeys.me(),
        });

        navigate({ replace: true, to: "/" });
      } catch (err) {
        logger.error("OAuth authentication failed", err);
        navigate({ replace: true, to: "/" });
      }
    };

    completeOAuth();
  }, [code, state, error, navigate, queryClient]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center space-y-4">
        <Spinner />
        <p className="text-muted-foreground">Completing sign in…</p>
      </div>
    </div>
  );
}