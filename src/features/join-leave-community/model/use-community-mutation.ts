import { useMutation } from '@tanstack/react-query';
import { notificationActions } from '@/shared/stores/notification-store';
import type { ActionResponse } from '@/entities/community/api/types';
import { communityApi } from '@/entities/community/api/communityApi';

export const useJoinCommunityMutation = () => {
  return useMutation<ActionResponse, Error, string>({
    mutationFn: (id: string) => communityApi.joinSubreddit(id),
    onSuccess: ({ message }) => {
      notificationActions.success(message);
    },
    onError: () => {
      notificationActions.error('Could not join community');
    },
  });
};

export const useLeaveCommunityMutation = () => {
  return useMutation<ActionResponse, Error, string>({
    mutationFn: (id: string) => communityApi.leaveSubreddit(id),
    onSuccess: ({ message }) => {
      notificationActions.success(message);
    },
    onError: () => {
      notificationActions.error('Could not join community');
    },
  });
};
