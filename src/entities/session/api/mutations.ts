import { useMutation } from '@tanstack/react-query';
import { clientStateActions } from '@/shared/stores';
import { sessionActions } from '../model/session-store';
import { queryClient } from '@/shared/utils/query-client';
import { sessionKeys } from './query-keys';
import { sessionApi } from './sessionApi';

import type { LoginRequest, RegisterRequest } from '@/shared/api/auth/types';

import { logger } from '@/shared/services/logger';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (payload: LoginRequest) => sessionApi.login(payload),

    onMutate: () => {
      sessionActions.setLoading(true);
    },

    onSuccess: async () => {
      sessionActions.setLoading(true);
      await queryClient.invalidateQueries({
        queryKey: sessionKeys.me(),
      });

      logger.info('Login successful');
    },

    onError: error => {
      sessionActions.setError(error instanceof Error ? error.message : 'Login failed');
      logger.error('Login failed', error);
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (payload: RegisterRequest) => sessionApi.register(payload),

    onMutate: () => {
      sessionActions.setLoading(true);
    },

    onSuccess: () => {
      sessionActions.setLoading(false);
      logger.info('Registration successful');
    },

    onError: error => {
      sessionActions.setError(error instanceof Error ? error.message : 'Registration failed');
      logger.error('Registration failed', error);
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: () => sessionApi.logout(),

    onSuccess: async () => {
      sessionActions.logout();

      await queryClient.removeQueries({
        queryKey: sessionKeys.all,
      });
      clientStateActions.resetOptimistic();
      logger.info('Logout successful');
    },

    onError: error => {
      logger.error('Logout failed', error);
      sessionActions.logout();
    },
  });
};

export const useRefreshMutation = () => {
  return useMutation({
    mutationFn: () => sessionApi.refresh(),

    onSuccess: async () => {
      sessionActions.setLoading(true);
      await queryClient.invalidateQueries({
        queryKey: sessionKeys.me(),
      });

      logger.info('Token refreshed');
    },

    onError: error => {
      logger.error('Token refresh failed', error);
      sessionActions.logout();
    },
  });
};

export const useGoogleOAuthMutation = () =>
  useMutation({
    mutationFn: async () => {
      const { url } = await sessionApi.getGoogleAuthUrl();
      window.location.href = url;
    },

    onError: error => {
      logger.error('Google OAuth failed to start', error);
    },
  });

export const useLogout = () => {
  const mutation = useLogoutMutation();

  return {
    logout: async () => {
      await mutation.mutateAsync();
    },
    isPending: mutation.isPending,
  };
};
