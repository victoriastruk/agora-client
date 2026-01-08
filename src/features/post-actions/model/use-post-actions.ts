import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useIsPostSaved,
  clientStateActions,
  authModalActions,
} from '../../../shared/stores';
import { logger } from '../../../shared/services/logger';
import { sharePost } from '../lib/share-utils';
import { useIsAuthenticated } from '../../../entities/session';

const queryKeys = {
  posts: {
    saved: () => ['posts', 'saved'],
  },
};

const useMockSavePostMutation = () => {
  const mutateAsync = async ({ postId }: { postId: string }) => {
    console.log('[MOCK] save post', postId);
    await new Promise(res => setTimeout(res, 300));
    return { success: true };
  };
  return { mutateAsync, isPending: false, error: null };
};

const useMockUnsavePostMutation = () => {
  const mutateAsync = async ({ postId }: { postId: string }) => {
    console.log('[MOCK] unsave post', postId);
    await new Promise(res => setTimeout(res, 300));
    return { success: true };
  };
  return { mutateAsync, isPending: false, error: null };
};

export const usePostActions = (postId: string) => {
  const isSaved = useIsPostSaved(postId);
  const isAuthenticated = useIsAuthenticated();
  const queryClient = useQueryClient();
  const savePostMutation = useMockSavePostMutation();
  const unsavePostMutation = useMockUnsavePostMutation();

  const save = useCallback(async () => {
    if (!isAuthenticated) {
      authModalActions.open();
      return;
    }

    const wasSaved = isSaved;

    if (isSaved) {
      clientStateActions.unsavePost(postId);
    } else {
      clientStateActions.savePost(postId);
    }

    try {
      if (isSaved) {
        await unsavePostMutation.mutateAsync({ postId });
      } else {
        await savePostMutation.mutateAsync({ postId });
      }

      queryClient.invalidateQueries({
        queryKey: queryKeys.posts.saved(),
      });
    } catch (error) {
      if (wasSaved) {
        clientStateActions.savePost(postId);
      } else {
        clientStateActions.unsavePost(postId);
      }
      logger.error('Failed to save/unsave post:', error);
      throw error;
    }
  }, [
    postId,
    isSaved,
    isAuthenticated,
    savePostMutation,
    unsavePostMutation,
    queryClient,
  ]);

  const share = useCallback(async () => {
    await sharePost(postId);
  }, [postId]);

  const isPending = savePostMutation.isPending || unsavePostMutation.isPending;

  return {
    isPending,
    isSaved,
    save,
    saveLabel: isSaved ? 'Saved' : 'Save',
    share,
  };
};
