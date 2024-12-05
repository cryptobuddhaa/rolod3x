import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Message } from '../types/message';
import { Contact } from '../types/contact';
import { MessageInput } from './MessageInput';
import { ensureValidImageUrl } from '../lib/utils';
import { useFirebase } from '../contexts/FirebaseContext';
import { getContact } from '../lib/firebase/contacts';
import { getMessages, createMessage, markMessageAsRead } from '../lib/firebase/messages';

export function ChatView() {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const { user } = useFirebase();
  const [messages, setMessages] = useState<Message[]>([]);
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      if (!user || !contactId) return;

      try {
        setLoading(true);
        setError(null);

        // Load contact details
        const contactData = await getContact(contactId);
        if (!contactData) {
          throw new Error('Contact not found');
        }
        setContact(contactData);

        // Load messages
        const fetchedMessages = await getMessages(user.uid, contactId);
        setMessages(fetchedMessages);

        // Mark messages as read
        await Promise.all(
          fetchedMessages
            .filter(msg => msg.isUnread && msg.sender !== 'You')
            .map(msg => markMessageAsRead(msg.id))
        );
      } catch (err) {
        setError('Failed to load messages. Please try again.');
        console.error('Error loading chat data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user, contactId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!user || !contact) return;

    try {
      const newMessage: Omit<Message, 'id'> = {
        userId: user.uid,
        contactId: contact.id,
        sender: 'You',
        avatar: '',
        content,
        timestamp: new Date().toISOString(),
        isUnread: false
      };

      await createMessage(newMessage);
      
      // Reload messages to get the new one with server timestamp
      const updatedMessages = await getMessages(user.uid, contact.id);
      setMessages(updatedMessages);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">Contact not found</p>
      </div>
    );
  }

  const avatarUrl = ensureValidImageUrl(contact.avatar);

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.20))]">
      <div className="bg-white border-b p-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/messages')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt={contact.name}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div className="flex-1">
              <h2 className="font-semibold">{contact.name}</h2>
              <p className="text-sm text-gray-500">{contact.location}</p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="m-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isUser = message.sender === 'You';
          const messageAvatarUrl = ensureValidImageUrl(message.avatar);

          return (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              {messageAvatarUrl && !isUser && (
                <img
                  src={messageAvatarUrl}
                  alt={message.sender}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p>{message.content}</p>
                <span className={`text-xs mt-1 block ${
                  isUser ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}