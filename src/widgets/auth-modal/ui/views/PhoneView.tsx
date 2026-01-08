import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Button } from '../../../../shared/ui/button';
import { FloatingInput } from '../../../../shared/ui/floating-input';

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', dialCode: '+39' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', dialCode: '+34' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', dialCode: '+31' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', dialCode: '+380' },
];

export const PhoneView = ({ mode }: { mode: 'login' | 'register' }) => {
  const [phoneUsername, setPhoneUsername] = useState('');
  const [localPhoneNumber, setLocalPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[7]);
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [codeInputs, setCodeInputs] = useState<string[]>(Array(6).fill(''));

  return (
    <div className="text-center space-y-6">
      <DialogPrimitive.Title className="text-2xl font-semibold text-gray-900 dark:text-[#D7DADC]">
        {mode === 'register' ? 'Continue with Phone' : 'Log in with Phone'}
      </DialogPrimitive.Title>

      <DialogPrimitive.Description className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        {mode === 'register'
          ? 'Enter your phone number to create an account'
          : 'Enter your phone number to log in'}
      </DialogPrimitive.Description>

      <div className="space-y-4">
        {mode === 'register' && (
          <FloatingInput
            id="phone-username"
            type="text"
            value={phoneUsername}
            onChange={e => setPhoneUsername(e.target.value)}
            label="Username"
            className="rounded-lg"
          />
        )}

        {/* Phone number input */}
        <div className="space-y-2 relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
            Phone number
          </label>
          <div className="flex">
            <button
              type="button"
              onClick={() => setShowCountrySelector(!showCountrySelector)}
              className="inline-flex items-center px-3 py-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-lg"
            >
              <span className="mr-2">{selectedCountry.flag}</span>
              <span className="text-xs">{selectedCountry.dialCode}</span>
            </button>
            <input
              type="tel"
              placeholder="555 123 4567"
              value={localPhoneNumber}
              onChange={e => setLocalPhoneNumber(e.target.value)}
              className="flex-1 px-3 py-3 border border-gray-300 rounded-none rounded-r-lg"
            />
          </div>

          {showCountrySelector && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
              {countries.map(country => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    setSelectedCountry(country);
                    setShowCountrySelector(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-sm flex-1">{country.name}</span>
                  <span className="text-sm text-gray-500">
                    {country.dialCode}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Verification code inputs */}
        <div className="flex justify-center space-x-3 mt-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={codeInputs[index] || ''}
              onChange={e => {
                const newInputs = [...codeInputs];
                newInputs[index] = e.target.value;
                setCodeInputs(newInputs);
              }}
              className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg"
              placeholder={`•`}
              title={`Verification code digit ${index + 1}`}
              aria-label={`Verification code digit ${index + 1}`}
            />
          ))}
        </div>

        <Button className="w-full py-3 rounded-full bg-[#d93a00] text-white">
          Continue
        </Button>
      </div>
    </div>
  );
};
