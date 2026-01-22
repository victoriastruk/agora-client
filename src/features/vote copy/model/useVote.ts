import { queryClient } from '@/shared/utils/query-client';
import { useCallback, useEffect, useMemo } from 'react';
import { calculateVoteValue, getVoteState } from '../lib/vote-utils';
import { VoteType } from '@/shared/api/gql';
import { useVotePostMutation, useVoteCommentMutation } from '@/shared/api/gql/query-hooks';
import { logger } from '@/shared/services/logger';
import { usePostVote, clientStateActions } from '@/shared/stores';

export const queryKeys = {
  posts: {
    lists: () => ['posts', 'lists'],
    detail: (postId: string) => ['posts', 'detail', postId],
  },
  comments: {
    byPost: (postId: string) => ['comments', 'byPost', postId],
  },
};

export const useVote = (postId: string, initialVote: -1 | 0 | 1 = 0) => {
  const storedVote = usePostVote(postId);
  const votePostMutation = useVotePostMutation();

  useEffect(() => {
    if (!postId || votePostMutation.isPending) {
      return;
    }

    const shouldSync = storedVote !== initialVote;
    if (shouldSync) {
      clientStateActions.votePost(postId, initialVote);
    }
  }, [postId, initialVote, storedVote, votePostMutation.isPending]);

  const currentVote = useMemo(() => {
    if (storedVote !== undefined) {
      return storedVote;
    }
    return initialVote;
  }, [storedVote, initialVote]);

  const vote = useCallback(
    async (direction: 'up' | 'down') => {
      if (votePostMutation.isPending || currentVote === (direction === 'up' ? 1 : -1)) {
        return;
      }

      const oldVote = currentVote;
      const newVote = calculateVoteValue(currentVote, direction);

      clientStateActions.votePost(postId, newVote);

      try {
        const voteType = direction === 'up' ? VoteType.Upvote : VoteType.Downvote;

        await votePostMutation.mutateAsync({
          postId,
          vote: voteType === VoteType.Upvote ? 1 : -1,
        });

        queryClient.invalidateQueries({
          queryKey: queryKeys.posts.lists(),
          refetchType: 'none',
        });
        queryClient.invalidateQueries({
          queryKey: queryKeys.posts.detail(postId),
          refetchType: 'none',
        });
      } catch (error) {
        clientStateActions.votePost(postId, oldVote);
        logger.error('Failed to vote on post:', error);
        throw error;
      }
    },
    [postId, currentVote, votePostMutation],
  );

  return {
    vote,
    currentVote,
    isPending: votePostMutation.isPending,
    ...getVoteState(currentVote),
  };
};

export const useCommentVote = (commentId: string, postId: string) => {
  const voteCommentMutation = useVoteCommentMutation();

  const vote = useCallback(
    async (direction: 'up' | 'down') => {
      if (voteCommentMutation.isPending) {
        return;
      }

      try {
        const voteType = direction === 'up' ? VoteType.Upvote : VoteType.Downvote;

        await voteCommentMutation.mutateAsync({
          postId: commentId,
          vote: voteType === VoteType.Upvote ? 1 : -1,
        });

        queryClient.invalidateQueries({
          queryKey: queryKeys.comments.byPost(postId),
        });
      } catch (error) {
        logger.error('Failed to vote on comment:', error);
        throw error;
      }
    },
    [commentId, postId, voteCommentMutation],
  );

  return {
    isPending: voteCommentMutation.isPending,
    vote,
  };
};
