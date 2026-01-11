import { OAuthButton } from '@/shared/ui/oauth-button';
import phoneIcon from '@/shared/assets/phone.svg';
import googleIcon from '@/shared/assets/google.svg';
import appleIcon from '@/shared/assets/apple.svg';
import linkIcon from '@/shared/assets/link.svg';
import { useGoogleOAuth } from '@/shared/services/google-auth';
import { useAppleOAuth } from '@/shared/services/apple-auth';
import { authModalActions } from '@/shared/stores';
import { notificationActions } from '@/shared/stores';

interface OAuthButtonsProps {
  showEmailLink?: boolean;
  mode?: 'login' | 'register';
}

// Mock hooks/state for phone auth
let localPhoneNumber = '';
let phoneUsername = '';
let localVerificationCode = '';
let step: 'phone' | 'code' = 'phone';

const sendVerificationCode = async (phone: string) => {
  console.log('[MOCK] send code to', phone);
  step = 'code';
};

const verifyCode = async (code: string) => {
  console.log('[MOCK] verify code', code);
  return { success: code === '123456' };
};

export default function OAuthButtons({
  showEmailLink = false,
  mode = 'login',
}: OAuthButtonsProps) {
  const { initiateGoogleOAuth, isLoading: isGoogleLoading } = useGoogleOAuth();
  const { initiateAppleOAuth, isLoading: isAppleLoading } = useAppleOAuth();

  const handlePhoneClick = () => {
    authModalActions.openPhone(mode);
  };

  const handleAppleClick = () => {
    initiateAppleOAuth();
  };

  const handlePhoneSubmit = async () => {
    if (step === 'phone') {
      if (!localPhoneNumber.trim()) {
        notificationActions.error(
          'Validation',
          'Please enter your phone number'
        );
        return;
      }
      if (mode === 'register' && !phoneUsername.trim()) {
        notificationActions.error('Validation', 'Please enter a username');
        return;
      }
      await sendVerificationCode(localPhoneNumber);
      notificationActions.success(
        'Code sent',
        'Use 123456 as the mock verification code'
      );
    } else if (step === 'code') {
      if (!localVerificationCode.trim()) {
        notificationActions.error(
          'Validation',
          'Please enter the verification code'
        );
        return;
      }
      const result = await verifyCode(localVerificationCode);
      if (result.success) {
        notificationActions.success(
          'Success',
          `Phone ${mode === 'register' ? 'registration' : 'login'} successful!`
        );
        // reset mock state
        localPhoneNumber = '';
        localVerificationCode = '';
        phoneUsername = '';
        step = 'phone';
      } else {
        notificationActions.error(
          'Invalid code',
          'The code is incorrect. Use 123456 for mock'
        );
      }
    }
  };

  const handleEmailLinkClick = () => {
    notificationActions.error('Realization in process...');
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <OAuthButton
          icon={
            <div className="w-6 h-6 flex items-center justify-center">
              <img src={phoneIcon} alt="Phone" className="w-5 h-5" />
            </div>
          }
          text="Continue with phone number"
          onClick={handlePhoneClick}
        />
        <OAuthButton
          icon={
            <div className="w-6 h-6 flex items-center justify-center">
              <img src={googleIcon} alt="Google" className="w-5 h-5" />
            </div>
          }
          text="Continue with Google"
          onClick={initiateGoogleOAuth}
          disabled={isGoogleLoading}
        />
        <OAuthButton
          icon={
            <div className="w-6 h-6 flex items-center justify-center">
              <img src={appleIcon} alt="Apple" className="w-8 h-8" />
            </div>
          }
          text="Continue with Apple"
          onClick={handleAppleClick}
          disabled={isAppleLoading}
        />

        {showEmailLink && (
          <OAuthButton
            icon={
              <div className="w-6 h-6 flex items-center justify-center">
                <img src={linkIcon} alt="Email link" className="w-5 h-5" />
              </div>
            }
            text="Continue with email link"
            onClick={handleEmailLinkClick}
          />
        )}
      </div>
    </>
  );
}