import { clientStateActions, useIsCommunityJoined } from '@/shared/stores/client-state';
import { useJoinCommunityMutation, useLeaveCommunityMutation } from './use-community-mutation';

export const useCommunityActions = (communityId: string) => {
  const isJoined = useIsCommunityJoined(communityId);

  const joinMutation = useJoinCommunityMutation();
  const leaveMutation = useLeaveCommunityMutation();

  const action = async () => {
    if (isJoined) {
      clientStateActions.leaveCommunity(communityId);

      try {
        await leaveMutation.mutateAsync(communityId);
      } catch (e) {
        clientStateActions.joinCommunity(communityId);
        throw e;
      }
    } else {
      clientStateActions.joinCommunity(communityId);

      try {
        await joinMutation.mutateAsync(communityId);
      } catch (e) {
        clientStateActions.leaveCommunity(communityId);
        throw e;
      }
    }
  };

  return {
    action,
    isJoined,
    isPending: joinMutation.isPending || leaveMutation.isPending,
    label: isJoined ? 'Joined' : 'Join',
  };
};
