import { useMutation } from '@tanstack/react-query';
import { communityApi } from '@/entities/community/api/communityApi';
import { communityKeys } from '@/entities/community/api/query-keys';
import { queryClient } from '@/shared/utils';

export const useCreateCommunityMutation = () => {
  return useMutation({
    mutationFn: communityApi.createSubreddit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: communityKeys.lists(),
      });
    },
  });
};
