// Mock GraphQL query hooks
export const useCommentsQuery = (postId: string, params: any, options: any) => {
  const data = Array.from({ length: 10 }, (_, i) => ({
    id: `mock-comment-${i + 1}`,
    content: `This is a mock comment ${i + 1} on post ${postId}`,
    author: {
      id: `mock-user-${(i % 5) + 1}`,
      name: `user${(i % 5) + 1}`,
    },
    createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
    score: Math.floor(Math.random() * 100),
    parentId: null,
    replies: [],
  }));

  return {
    data,
    isLoading: false,
    error: null,
    refetch: () => Promise.resolve(),
  };
};

export const useCommentQuery = (commentId: string, options: any) => {
  const data = {
    id: commentId,
    content: `This is mock content for comment ${commentId}`,
    author: {
      id: 'mock-user-1',
      name: 'mockuser',
    },
    createdAt: new Date().toISOString(),
    score: 42,
    parentId: null,
    replies: [],
  };

  return {
    data,
    isLoading: false,
    error: null,
    refetch: () => Promise.resolve(),
  };
};

export const useUserCommentsQuery = (userId: string, params: any, options: any) => {
  const data = Array.from({ length: 5 }, (_, i) => ({
    id: `mock-user-comment-${i + 1}`,
    content: `Mock comment ${i + 1} by user ${userId}`,
    author: {
      id: userId,
      name: `user${userId.slice(-1)}`,
    },
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    score: Math.floor(Math.random() * 50),
    parentId: null,
    replies: [],
  }));

  return {
    data,
    isLoading: false,
    error: null,
    refetch: () => Promise.resolve(),
  };
};

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
