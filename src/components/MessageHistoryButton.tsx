import React from 'react';
import { MessageSquare } from 'lucide-react';

interface MessageHistoryButtonProps {
  onImport: () => void;
}

export function MessageHistoryButton({ onImport }: MessageHistoryButtonProps) {
  return (
    <button
      onClick={onImport}
      className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
    >
      <MessageSquare className="w-5 h-5" />
      Import Telegram Message History
    </button>
  );
}