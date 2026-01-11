import { useCallback, useEffect, useMemo } from "react";
import { usePostVote, clientStateActions } from "@/shared/stores";
import { calculateVoteValue, getVoteState } from "../lib/vote-utils";

// TODO(mock-env): replace with real vote gql mutations
export const useVote = (postId: string, initialVote: -1 | 0 | 1 = 0) => {
  const storedVote = usePostVote(postId);

  useEffect(() => {
    if (!postId) return;

    if (storedVote !== initialVote) {
      clientStateActions.votePost(postId, initialVote);
    }
  }, [postId, initialVote, storedVote]);

  const currentVote = useMemo(
    () => storedVote ?? initialVote,
    [storedVote, initialVote]
  );

  const vote = useCallback(
    async (direction: "up" | "down") => {
      const newVote = calculateVoteValue(currentVote, direction);
      clientStateActions.votePost(postId, newVote);

      // TODO(mock-env): simulate backend delay / error if needed
      await Promise.resolve();
    },
    [postId, currentVote]
  );

  return {
    vote,
    currentVote,
    isPending: false,
    ...getVoteState(currentVote),
  };
};
// TODO(mock-env): replace with real comment vote mutation
export const useCommentVote = (_commentId: string, _postId: string) => {
  const vote = useCallback(async (_direction: "up" | "down") => {
    // noop — comment voting mocked
    await Promise.resolve();
  }, []);

  return {
    isPending: false,
    vote,
  };
};
