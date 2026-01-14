import type { CreateSubredditData, SubredditResponse, SubredditsApiResponse } from './types';

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

  createSubreddit: async (data: CreateSubredditData) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('display_name', data.display_name);
    formData.append('is_private', String(data.is_private));
    formData.append('is_nsfw', String(data.is_nsfw));

    if (data.description) {
      formData.append('description', data.description);
    }

    if (data.icon_url) {
      formData.append('icon_url', data.icon_url);
    }

    if (data.banner_url) {
      formData.append('banner_url', data.banner_url);
    }

    return apiClient.request('/subreddits', {
      method: 'POST',
      body: formData,
    });
  },
} as const;
