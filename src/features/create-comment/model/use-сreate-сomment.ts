import { useCallback } from 'react';

import { useSessionUser } from '@/entities/session';
import { logger } from '@/shared/services/logger';

const useMockCreateCommentMutation = () => {
  const mutateAsync = async ({
    input,
  }: {
    input: { content: string; parentId?: string; postId: string };
  }) => {
    logger.info('[MOCK] create comment', input);
    await new Promise(res => setTimeout(res, 500));
    return {
      createComment: {
        id: `mock-${Math.floor(Math.random() * 100000)}`,
        content: input.content,
        parentId: input.parentId ?? null,
        postId: input.postId,
        author: {
          id: 'mock-user-id',
          name: 'Mock User',
        },
        createdAt: new Date().toISOString(),
        votes: 0,
        replies: [],
      },
    };
  };

  return { mutateAsync, error: null, isPending: false };
};

export const useCreateComment = (postId: string) => {
  const user = useSessionUser();
  const createCommentMutation = useMockCreateCommentMutation();

  const createComment = useCallback(
    async (content: string, parentId?: string) => {
      if (!user) {
        const authError = new Error('User must be authenticated to create comments');
        logger.error('Create comment failed:', authError);
        throw authError;
      }

      try {
        const result = await createCommentMutation.mutateAsync({
          input: {
            content,
            parentId: parentId ?? undefined,
            postId,
          },
        });

        logger.info('Comment created successfully');
        return result.createComment;
      } catch (error) {
        logger.error('Failed to create comment:', error);
        throw error instanceof Error ? error : new Error(String(error));
      }
    },
    [postId, user, createCommentMutation],
  );

  return {
    createComment,
    error: createCommentMutation.error,
    isPending: createCommentMutation.isPending,
  };
};
