import type { SubredditResponse, SubredditsApiResponse } from './types';

import { apiClient } from '@/shared/api/client';

export const communityApi = {
  getSubreddits: async (): Promise<SubredditResponse[]> => {
    const { subreddits } = await apiClient.request<SubredditsApiResponse>('/subreddits', {
      method: 'GET',
    });
    return subreddits;
  },

  getSubredditById: (id: string): Promise<SubredditResponse> =>
    apiClient.request<SubredditResponse>(`/subreddits/${id}`, {
      method: 'GET',
    }),
} as const;
