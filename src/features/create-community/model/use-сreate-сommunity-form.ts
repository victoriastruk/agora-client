import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import type { CreateSubredditData } from "@/entities/community/api/types";
import { communityApi } from "@/entities/community/api/communityApi";
import { queryClient } from "@/shared/utils";
import { communityKeys } from "@/entities/community/api/query-keys";
import { createCommunitySchema } from "../lib/schemas";
import { notificationActions } from "@/shared/stores";
import { logger } from "@/shared/services/logger";

interface UseCreateCommunityFormOptions {
  onSuccess?: (communityId: string) => void;
  navigateOnSuccess?: boolean;
}

export const useCreateCommunityForm = (
  options?: UseCreateCommunityFormOptions
) => {
  const createCommunityMutation = useCreateCommunityMutation();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      avatarUrl: "",
      bannerUrl: "",
      name: "",
      displayName: "",
      description: "",
      communityType: "public",
    },
    onSubmit: async ({ value }) => {
      if (createCommunityMutation.isPending) {
        return;
      }

      try {
        const result = await createCommunityMutation.mutateAsync({
          name: value.name,
          display_name: value.displayName,
          description: value.description || undefined,
          // TODO: Add icon_url support when file upload is implemented
        });

        if (result) {
          notificationActions.success(
            "Community created!",
            `r/${result.name} has been created`
          );
          options?.onSuccess?.(result.id);

          if (options?.navigateOnSuccess !== false) {
            navigate({
              params: { communityId: result.name },
              to: "/r/$communityId",
            });
          }
        }
      } catch (error) {
        logger.error("Failed to create community:", error);
        notificationActions.error(
          "Failed to create community",
          error instanceof Error ? error.message : "Please try again later"
        );
        throw error;
      }
    },
    validators: {
      onSubmit: createCommunitySchema,
    },
  });

  return {
    error: createCommunityMutation.error,
    form,
    isSubmitting: createCommunityMutation.isPending,
  };
};

export const useCreateCommunityMutation = () => {
  return useMutation({
    mutationFn: (data: CreateSubredditData) =>
      communityApi.createSubreddit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communityKeys.list({}) });
    },
  });
};
