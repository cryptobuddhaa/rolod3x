import React, { useState, useEffect } from 'react';
import { Check, X, Loader2 } from 'lucide-react';
import { ensureValidImageUrl } from '../lib/utils';
import { Contact } from '../types/contact';
import { TelegramContactImport } from './TelegramContactImport';

interface TelegramContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectContacts: (contacts: Contact[]) => void;
}

export function TelegramContactModal({ isOpen, onClose, onSelectContacts }: TelegramContactModalProps) {
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);

  const toggleContact = (contactId: string) => {
    const newSelected = new Set(selectedContacts);
    if (newSelected.has(contactId)) {
      newSelected.delete(contactId);
    } else {
      newSelected.add(contactId);
    }
    setSelectedContacts(newSelected);
  };

  const handleAddContacts = () => {
    const selectedContactsList = contacts.filter(contact => 
      selectedContacts.has(contact.email || contact.phone)
    );
    onSelectContacts(selectedContactsList);
    setSelectedContacts(new Set());
    onClose();
  };

  const handleImportContacts = (newContacts: Contact[]) => {
    setContacts(prevContacts => {
      // Merge new contacts with existing ones, avoiding duplicates
      const existingIds = new Set(prevContacts.map(c => c.email || c.phone));
      const uniqueNewContacts = newContacts.filter(c => !existingIds.has(c.email || c.phone));
      return [...prevContacts, ...uniqueNewContacts];
    });
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Import Contacts</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-6">
            <TelegramContactImport
              onImportContacts={handleImportContacts}
              onError={setError}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {contacts.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No contacts imported yet
              </div>
            ) : (
              contacts.map(contact => {
                const avatarUrl = ensureValidImageUrl(contact.avatar);
                const contactId = contact.email || contact.phone;
                return (
                  <div
                    key={contactId}
                    className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    onClick={() => toggleContact(contactId)}
                  >
                    <div className="relative">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={contact.name}
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-lg">
                            {contact.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      {selectedContacts.has(contactId) && (
                        <div className="absolute -right-1 -bottom-1 bg-blue-500 rounded-full p-1">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-500">
                        {contact.phone || contact.email}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleAddContacts}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedContacts.size === 0}
          >
            Add Selected Contacts ({selectedContacts.size})
          </button>
        </div>
      </div>
    </div>
  );
}