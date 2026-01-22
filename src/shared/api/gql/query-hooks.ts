// Mock GraphQL query hooks
import { logger } from '@/shared/services';
export const useVotePostMutation = () => {
  return {
    mutateAsync: async (params: { postId: string; vote: number }) => {
      logger.info('Mock vote post mutation:', params);
      return { success: true };
    },
    isPending: false,
    error: null,
  };
};

export const useVoteCommentMutation = () => {
  return {
    mutateAsync: async (params: { postId: string; vote: number }) => {
      logger.info('Mock vote comment mutation:', params);
      return { success: true };
    },
    isPending: false,
    error: null,
  };
};
