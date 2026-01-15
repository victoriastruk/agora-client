import { useGoogleOAuthMutation } from '@/entities/session';

export const useGoogleOAuth = () => {
  const googleOAuthMutation = useGoogleOAuthMutation();

  const initiateGoogleOAuth = async () => {
    try {
      await googleOAuthMutation.mutateAsync();
    } catch (error) {
      throw new Error('Unable to initiate Google authentication');
    }
  };

  return {
    initiateGoogleOAuth,
    isLoading: googleOAuthMutation.isPending,
  };
};
