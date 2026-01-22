import { logger } from '@sentry/react';
import type { QueryClient } from '@tanstack/react-query';

// Mock prefetch functions for now
// These will be replaced with real API calls when backend is ready

export const prefetchQueries = {
  feed: async (_queryClient: QueryClient, options: { limit: number }) => {
    // Mock prefetch - in real app this would prefetch posts
    logger.info(`[PREFETCH] Feed with limit ${options.limit}`);
    return Promise.resolve();
  },

  topStories: async (_queryClient: QueryClient, limit: number) => {
    // Mock prefetch - in real app this would prefetch top stories
    logger.info(`[PREFETCH] Top stories with limit ${limit}`);
    return Promise.resolve();
  },

  popularCommunities: async (_queryClient: QueryClient, limit: number) => {
    // Mock prefetch - in real app this would prefetch popular communities
    logger.info(`[PREFETCH] Popular communities with limit ${limit}`);
    return Promise.resolve();
  },

  post: async (_queryClient: QueryClient, postId: string) => {
    // Mock prefetch - in real app this would prefetch single post
    logger.info(`[PREFETCH] Post with id ${postId}`);
    return Promise.resolve();
  },

  comments: async (_queryClient: QueryClient, postId: string) => {
    // Mock prefetch - in real app this would prefetch comments for post
    logger.info(`[PREFETCH] Comments for post ${postId}`);
    return Promise.resolve();
  },
};
