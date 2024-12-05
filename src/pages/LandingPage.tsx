import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { SignInButton } from '../components/SignInButton';
import { useFirebase } from '../contexts/FirebaseContext';
import { AlertCircle } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();
  const { user } = useFirebase();
  const [error, setError] = useState<string | null>(null);

  const handleSignInSuccess = () => {
    navigate('/contacts');
  };

  const handleSignInError = (error: Error) => {
    setError(error.message);
  };

  const handleStart = () => {
    if (user) {
      navigate('/contacts');
    }
  };

  return (
    <div className="min-h-screen bg-[#0088cc] flex flex-col items-center justify-center text-white p-4">
      <div className="text-center space-y-8">
        <div className="space-y-2">
          <p className="text-xl font-light tracking-wide">Enter Your</p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <Logo className="w-16 h-16 text-white" />
            <h1 className="text-6xl font-bold tracking-tight">ROLOD3X</h1>
          </div>
        </div>

        {error && (
          <div className="bg-red-500 bg-opacity-10 border border-red-200 rounded-lg p-3 flex items-center gap-2 max-w-sm mx-auto">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm text-left">{error}</p>
          </div>
        )}

        {user ? (
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-white text-[#0088cc] rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
          >
            Start
          </button>
        ) : (
          <div className="w-64 mx-auto">
            <SignInButton 
              onSuccess={handleSignInSuccess}
              onError={handleSignInError}
            />
          </div>
        )}
      </div>

      <div className="absolute bottom-8 text-sm text-blue-100">
        Your Web3 Contact Management Solution
      </div>
    </div>
  );
}