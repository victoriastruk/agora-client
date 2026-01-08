import { useCallback } from 'react';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { notificationActions } from '../../../shared/stores';
import { logger } from '../../../shared/services/logger';
import { createCommunitySchema } from '../lib/schemas';
import type { CreateCommunityValues } from '../lib/schemas';

interface UseCreateCommunityFormOptions {
  onSuccess?: (communityName: string) => void;
  navigateOnSuccess?: boolean;
}

const DEFAULT_VALUES: CreateCommunityValues = {
  communityType: 'public',
  description: '',
  displayName: '',
  name: '',
};

const useMockCreateCommunityMutation = () => {
  const mutateAsync = async ({
    input,
  }: {
    input: { name: string; displayName: string; description?: string };
  }) => {
    console.log('[MOCK] create community', input);
    await new Promise(res => setTimeout(res, 500));
    return {
      createCommunity: {
        id: `mock-${Math.floor(Math.random() * 100000)}`,
        name: input.name,
        displayName: input.displayName,
        description: input.description || '',
        communityType: 'public',
        createdAt: new Date().toISOString(),
      },
    };
  };

  return { mutateAsync, error: null, isPending: false };
};

export const useCreateCommunityForm = (
  options?: UseCreateCommunityFormOptions
) => {
  const createCommunityMutation = useMockCreateCommunityMutation();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: DEFAULT_VALUES,
    onSubmit: async ({ value }) => {
      if (createCommunityMutation.isPending) {
        return;
      }

      try {
        const result = await createCommunityMutation.mutateAsync({
          input: {
            description: value.description || undefined,
            displayName: value.displayName,
            name: value.name.toLowerCase(),
          },
        });

        if (result.createCommunity) {
          const communityName = result.createCommunity.name;
          notificationActions.success(
            'Community created!',
            `r/${communityName} is ready`
          );
          options?.onSuccess?.(communityName);

          if (options?.navigateOnSuccess !== false) {
            navigate({
              params: { communityId: communityName },
              to: '/r/$communityId',
            });
          }
        }
      } catch (error) {
        logger.error('Failed to create community:', error);
        notificationActions.error(
          'Failed to create community',
          error instanceof Error ? error.message : 'Please try again later'
        );
        throw error;
      }
    },
    validators: {
      onSubmit: createCommunitySchema,
    },
  });

  const reset = useCallback(() => {
    form.reset();
  }, [form]);

  return {
    error: createCommunityMutation.error,
    form,
    isSubmitting: createCommunityMutation.isPending,
    reset,
  };
};
