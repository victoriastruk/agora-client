import { useCallback } from "react";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { notificationActions } from "../../../shared/stores";
import { logger } from "../../../shared/services/logger";
import { createPostSchema } from "../lib/schemas";
import type { CreatePostValues } from "../lib/schemas";

interface UseCreatePostFormOptions {
  defaultCommunityId?: string;
  onSuccess?: (postId: string) => void;
  navigateOnSuccess?: boolean;
}

const useMockCreatePostMutation = () => {
  const mutateAsync = async ({
    input,
  }: {
    input: { communityId: string; title: string; content?: string; type: PostType };
  }) => {
    console.log("[MOCK] create post", input);
    await new Promise((res) => setTimeout(res, 500)); 
    return {
      createPost: {
        id: `mock-${Math.floor(Math.random() * 100000)}`,
        title: input.title,
        content: input.content || "",
        communityId: input.communityId,
        type: input.type,
        createdAt: new Date().toISOString(),
        author: {
          id: "mock-user-id",
          name: "Mock User",
        },
      },
    };
  };

  return { mutateAsync, error: null, isPending: false };
};

export const useCreatePostForm = (options?: UseCreatePostFormOptions) => {
  const createPostMutation = useMockCreatePostMutation();
  const navigate = useNavigate();

  const defaultValues: CreatePostValues = {
    communityId: options?.defaultCommunityId ?? "",
    content: "",
    title: "",
  };

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      if (createPostMutation.isPending) {
        return;
      }

      try {
        const result = await createPostMutation.mutateAsync({
          input: {
            communityId: value.communityId,
            content: value.content || undefined,
            title: value.title,
            type: PostType.Text,
          },
        });

        if (result.createPost) {
          const postId = result.createPost.id;
          notificationActions.success("Post created!", "Your post has been published");
          options?.onSuccess?.(postId);

          if (options?.navigateOnSuccess !== false) {
            navigate({
              params: { postId },
              to: "/post/$postId",
            });
          }
        }
      } catch (error) {
        logger.error("Failed to create post:", error);
        notificationActions.error(
          "Failed to create post",
          error instanceof Error ? error.message : "Please try again later"
        );
        throw error;
      }
    },
    validators: {
      onSubmit: createPostSchema,
    },
  });

  const reset = useCallback(() => {
    form.reset();
  }, [form]);

  return {
    error: createPostMutation.error,
    form,
    isSubmitting: createPostMutation.isPending,
    reset,
  };
};
