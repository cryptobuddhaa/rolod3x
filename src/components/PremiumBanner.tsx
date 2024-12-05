import React from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../contexts/TelegramContext';

export function PremiumBanner() {
  const navigate = useNavigate();
  const { webApp } = useTelegram();

  const handleClick = () => {
    if (webApp) {
      webApp.MainButton.text = 'Connect Wallet';
      webApp.MainButton.show();
      webApp.MainButton.onClick(() => {
        navigate('/premium');
        webApp.MainButton.hide();
      });
    } else {
      navigate('/premium');
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-1 sm:py-1.5 px-2 sm:px-4 cursor-pointer hover:from-blue-700 hover:to-purple-700 transition-all"
    >
      <div className="container mx-auto flex items-center justify-center gap-1 sm:gap-2">
        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="text-xs sm:text-sm font-medium">Connect Wallet for Premium Features</span>
      </div>
    </div>
  );
}