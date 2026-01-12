//mock
export const usePhoneAuth = () => {
  const sendVerificationCode = async (phone: string) => {
    console.log('[MOCK] Send code to', phone);
    await new Promise(res => setTimeout(res, 500));
    return { success: true };
  };

  const verifyCode = async (code: string) => {
    console.log('[MOCK] Verify code', code);
    await new Promise(res => setTimeout(res, 500));

    return {
      success: code === '123456',
    };
  };

  return {
    sendVerificationCode,
    verifyCode,
  };
};
