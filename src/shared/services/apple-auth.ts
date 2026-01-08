//mock
export const useAppleOAuth = () => {
  const initiateAppleOAuth = async () => {
    console.log('[MOCK] Apple OAuth start');

    await new Promise(res => setTimeout(res, 1000));

    console.log('[MOCK] Apple OAuth success');

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
