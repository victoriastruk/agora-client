import { queryOptions } from "@tanstack/react-query";
import { sessionKeys } from "./query-keys";
import { extractUserFromResponse } from "./types";
import { sessionApi } from "./sessionApi";
import type { AuthUserData } from "./types";

export const sessionQueries = {
  currentUser: () =>
    queryOptions({
      queryFn: sessionApi.getCurrentUser,
      queryKey: sessionKeys.me(),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Infinity,
      gcTime: Infinity,
      select: (response): AuthUserData | null => extractUserFromResponse(response),
    }),
} as const;
