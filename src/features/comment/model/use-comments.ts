import { useMemo } from 'react';
import type { Comment } from '@/entities/comment/model/types';
import { mockComments } from '@/shared/api/mocks/comments.mock';

export const useComment = (commentId: string) => {
  const comment = useMemo<Comment | undefined>(() => {
    if (!commentId) return undefined;

    const findRecursively = (comments: Comment[]): Comment | undefined => {
      for (const comment of comments) {
        if (comment.id === commentId) return comment;
        const reply = findRecursively(comment.replies);
        if (reply) return reply;
      }
    };

    return findRecursively(mockComments);
  }, [commentId]);

  return {
    comment,
    isLoading: false,
    error: null,
    refetch: () => {},
  };
};
