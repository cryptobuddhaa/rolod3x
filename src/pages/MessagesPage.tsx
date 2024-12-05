import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Message } from '../types/message';
import { Contact } from '../types/contact';
import { useFirebase } from '../contexts/FirebaseContext';
import { getMessages, getUnreadCount } from '../lib/firebase/messages';
import { getContacts } from '../lib/firebase/contacts';
import { ensureValidImageUrl } from '../lib/utils';
import { ContactSelectionModal } from '../components/ContactSelectionModal';

export function MessagesPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useFirebase();
  const [showContactModal, setShowContactModal] = useState(false);
  const [messages, setMessages] = useState<Record<string, Message & { unreadCount: number }>>({});
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Load contacts first
        const fetchedContacts = await getContacts(user.uid);
        setContacts(fetchedContacts);
        
        // Load messages and unread counts for each contact
        const messagesByContact: Record<string, Message & { unreadCount: number }> = {};
        
        await Promise.all(
          fetchedContacts.map(async (contact) => {
            const contactMessages = await getMessages(user.uid, contact.id);
            const unreadCount = await getUnreadCount(user.uid, contact.id);
            
            if (contactMessages.length > 0) {
              const latestMessage = contactMessages[0];
              messagesByContact[contact.id] = {
                ...latestMessage,
                unreadCount
              };
            }
          })
        );
        
        setMessages(messagesByContact);
      } catch (err) {
        setError('Failed to load messages. Please try again.');
        console.error('Error loading messages:', err);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      loadData();
    }
  }, [user, authLoading]);

  const handleContactClick = (contact: Contact) => {
    navigate(`/messages/${contact.id}`, { 
      state: { selectedContact: contact }
    });
  };

  const handleNewMessageContact = (contact: Contact) => {
    setShowContactModal(false);
    navigate(`/messages/${contact.id}`, {
      state: { selectedContact: contact }
    });
  };

  // Filter out contacts that already have messages
  const uncontactedContacts = useMemo(() => {
    const contactedIds = new Set(Object.keys(messages));
    return contacts.filter(contact => !contactedIds.has(contact.id));
  }, [contacts, messages]);

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [contacts, searchQuery]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">Please sign in to view your messages.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Messages</h1>
        <button 
          onClick={() => setShowContactModal(true)}
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          New Message
        </button>
      </div>

      <div className="mb-4 sm:mb-6">
        <div className="relative">
          <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No messages found.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredContacts.map((contact) => {
            const message = messages[contact.id];
            const avatarUrl = ensureValidImageUrl(contact.avatar);
            const timestamp = message ? new Date(message.timestamp) : new Date();
            const timeString = timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            });

            return (
              <div
                key={contact.id}
                onClick={() => handleContactClick(contact)}
                className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="relative">
                  {avatarUrl && (
                    <img
                      src={avatarUrl}
                      alt={contact.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                    />
                  )}
                  {message?.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
                      {message.unreadCount}
                    </span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm sm:text-base truncate">{contact.name}</h3>
                    <span className="text-xs sm:text-sm text-gray-500">{timeString}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">
                    {message?.content || 'No messages yet'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ContactSelectionModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        onSelectContact={handleNewMessageContact}
        contacts={uncontactedContacts}
      />
    </div>
  );
}