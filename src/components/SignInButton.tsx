import React from 'react';
import { Loader2 } from 'lucide-react';
import { signInWithGoogle, signInWithTelegram } from '../lib/firebase/auth';
import { useTelegram } from '../contexts/TelegramContext';

interface SignInButtonProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function SignInButton({ onSuccess, onError }: SignInButtonProps) {
  const [loading, setLoading] = React.useState(false);
  const { webApp } = useTelegram();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      if (webApp) {
        await signInWithTelegram();
      } else {
        await signInWithGoogle();
      }
      onSuccess?.();
    } catch (error) {
      console.error('Sign in error:', error);
      onError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={loading}
      className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <span>Sign in with {webApp ? 'Telegram' : 'Google'}</span>
      )}
    </button>
  );
}