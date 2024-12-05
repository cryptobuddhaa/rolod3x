import React, { useState } from 'react';
import { Users, AlertCircle, Loader2 } from 'lucide-react';
import { getTelegramContacts } from '../lib/telegram/contacts';
import { useTelegram } from '../contexts/TelegramContext';
import { Contact } from '../types/contact';

interface TelegramContactImportProps {
  onImportContacts: (contacts: Contact[]) => void;
  onError: (error: string) => void;
}

export function TelegramContactImport({ onImportContacts, onError }: TelegramContactImportProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { webApp } = useTelegram();

  const handleImport = async () => {
    if (!webApp) {
      onError('This feature is only available in the Telegram app');
      return;
    }

    setIsLoading(true);
    try {
      const contacts = await getTelegramContacts(webApp);
      onImportContacts(contacts);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to import contacts');
    } finally {
      setIsLoading(false);
    }
  };

  if (!webApp) {
    return (
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <AlertCircle className="w-4 h-4" />
        <span>Available only in Telegram</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleImport}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Users className="w-5 h-5" />
      )}
      Import Telegram Contacts
    </button>
  );
}