import appleIcon from '@/shared/assets/apple.svg';
import googleIcon from '@/shared/assets/google.svg';
import linkIcon from '@/shared/assets/link.svg';
import phoneIcon from '@/shared/assets/phone.svg';
import { useAppleOAuth } from '@/shared/services/apple-auth';
import { useGoogleOAuth } from '@/shared/services/google-auth';
import { authModalActions, notificationActions } from '@/shared/stores';
import { OAuthButton } from '@/shared/ui/oauth-button';

interface OAuthButtonsProps {
  showEmailLink?: boolean;
  mode?: 'login' | 'register';
}

export default function OAuthButtons({ showEmailLink = false, mode = 'login' }: OAuthButtonsProps) {
  const { initiateGoogleOAuth, isLoading: isGoogleLoading } = useGoogleOAuth();
  const { initiateAppleOAuth, isLoading: isAppleLoading } = useAppleOAuth();

  const handlePhoneClick = () => {
    authModalActions.openPhone(mode);
  };

  const handleAppleClick = () => {
    initiateAppleOAuth();
  };

  const handleEmailLinkClick = () => {
    notificationActions.error('Realization in process...');
  };

  return (
    <>
      <div className='flex flex-col gap-2'>
        <OAuthButton
          icon={
            <div className='w-6 h-6 flex items-center justify-center'>
              <img src={phoneIcon} alt='Phone' className='w-5 h-5' />
            </div>
          }
          text='Continue with phone number'
          onClick={handlePhoneClick}
        />
        <OAuthButton
          icon={
            <div className='w-6 h-6 flex items-center justify-center'>
              <img src={googleIcon} alt='Google' className='w-5 h-5' />
            </div>
          }
          text='Continue with Google'
          onClick={initiateGoogleOAuth}
          disabled={isGoogleLoading}
        />
        <OAuthButton
          icon={
            <div className='w-6 h-6 flex items-center justify-center'>
              <img src={appleIcon} alt='Apple' className='w-8 h-8' />
            </div>
          }
          text='Continue with Apple'
          onClick={handleAppleClick}
          disabled={isAppleLoading}
        />

        {showEmailLink && (
          <OAuthButton
            icon={
              <div className='w-6 h-6 flex items-center justify-center'>
                <img src={linkIcon} alt='Email link' className='w-5 h-5' />
              </div>
            }
            text='Continue with email link'
            onClick={handleEmailLinkClick}
          />
        )}
      </div>
    </>
  );
}
