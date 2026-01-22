import { logger } from '@/shared/services';

//mock
export const useAppleOAuth = () => {
  const initiateAppleOAuth = async () => {
    logger.info('[MOCK] Apple OAuth start');

    await new Promise(res => setTimeout(res, 1000));

    logger.info('[MOCK] Apple OAuth success');

    return {
      success: true,
      provider: 'apple',
      user: {
        id: 'mock-apple-user-id',
        email: 'apple@mock.dev',
      },
    };
  };

  return {
    initiateAppleOAuth,
    isLoading: false,
  };
};
