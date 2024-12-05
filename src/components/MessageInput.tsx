import React, { useState } from 'react';
import { Smile, Paperclip, Mic, Video, Send } from 'lucide-react';
import { useTelegram } from '../contexts/TelegramContext';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { webApp } = useTelegram();

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachment = () => {
    if (webApp) {
      webApp.MainButton.text = 'Choose File';
      webApp.MainButton.show();
      webApp.MainButton.onClick(() => {
        webApp.MainButton.hide();
      });
    }
  };

  return (
    <div className="border-t bg-white p-2 sm:p-4">
      <div className="flex items-end gap-2">
        <div className="flex-1 bg-gray-50 rounded-lg p-2">
          <div className="flex items-center gap-1 sm:gap-2 mb-2">
            <button 
              onClick={handleAttachment}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Paperclip className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <Smile className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            </button>
            <button 
              className={`p-1 hover:bg-gray-100 rounded-full transition-colors ${isRecording ? 'text-red-500' : ''}`}
              onClick={() => setIsRecording(!isRecording)}
            >
              <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <Video className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            </button>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="w-full bg-transparent resize-none focus:outline-none text-sm sm:text-base"
            rows={1}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="p-2 sm:p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
      {isRecording && (
        <div className="mt-2 flex items-center gap-1 sm:gap-2 text-red-500">
          <span className="animate-pulse">●</span>
          <span className="text-xs sm:text-sm">Recording audio message...</span>
        </div>
      )}
    </div>
  );
}