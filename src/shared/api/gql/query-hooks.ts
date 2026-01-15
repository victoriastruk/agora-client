// Mock GraphQL query hooks
export const useVotePostMutation = () => {
  return {
    mutateAsync: async (params: any) => {
      console.log('Mock vote post mutation:', params);
      return { success: true };
    },
    isPending: false,
    error: null,
  };
};

export const useVoteCommentMutation = () => {
  return {
    mutateAsync: async (params: any) => {
      console.log('Mock vote comment mutation:', params);
      return { success: true };
    },
    isPending: false,
    error: null,
  };
};
