import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTelegram } from '../contexts/TelegramContext';
import { Sidebar } from './Sidebar';
import { PremiumBanner } from './PremiumBanner';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { webApp } = useTelegram();

  React.useEffect(() => {
    if (webApp) {
      if (location.pathname === '/contacts') {
        webApp.BackButton.hide();
      } else {
        webApp.BackButton.show();
      }
    }
  }, [location.pathname, webApp]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <PremiumBanner />
      <main className="flex-1 overflow-auto pb-16">
        <div className="container mx-auto px-2 py-2 sm:px-4 sm:py-6 max-w-5xl">
          {children}
        </div>
      </main>
      <Sidebar />
    </div>
  );
}