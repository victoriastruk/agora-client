import { logger } from '@/shared/services';

//mock
export const usePhoneAuth = () => {
  const sendVerificationCode = async (phone: string) => {
    logger.info('[MOCK] Send code to', phone);
    await new Promise(res => setTimeout(res, 500));
    return { success: true };
  };

  const verifyCode = async (code: string) => {
    logger.info('[MOCK] Verify code', code);
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
