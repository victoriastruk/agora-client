import { useMutation } from '@tanstack/react-query';

import type { CreateSubredditData } from '@/entities/community/api/types';

import { communityApi } from '@/entities/community/api/communityApi';
import { communityKeys } from '@/entities/community/api/query-keys';
import { queryClient } from '@/shared/utils';

export const useCreateCommunityMutation = () => {
  return useMutation({
    mutationFn: (data: CreateSubredditData) => communityApi.createSubreddit(data),
    onSuccess: newCommunity => {
      queryClient.invalidateQueries({ queryKey: communityKeys.list({}) });
    },
  });
};
