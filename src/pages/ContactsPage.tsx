import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, ArrowUpDown, Loader2 } from 'lucide-react';
import { ContactCard } from '../components/ContactCard';
import { TelegramContactModal } from '../components/TelegramContactModal';
import { Contact } from '../types/contact';
import { useFirebase } from '../contexts/FirebaseContext';
import { getContacts, createContact, updateContact } from '../lib/firebase/contacts';

type SortOrder = 'asc' | 'desc' | null;

export function ContactsPage() {
  const { user, loading: authLoading } = useFirebase();
  const [searchQuery, setSearchQuery] = useState('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContacts() {
      if (!user) return;
      
      try {
        setLoading(true);
        setError(null);
        const fetchedContacts = await getContacts(user.uid);
        setContacts(fetchedContacts);
      } catch (err) {
        setError('Failed to load contacts. Please try again.');
        console.error('Error loading contacts:', err);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      loadContacts();
    }
  }, [user, authLoading]);

  const handleAddContacts = async (selectedContacts: Omit<Contact, 'id' | 'userId'>[]) => {
    if (!user) return;

    try {
      setError(null);
      const newContacts = await Promise.all(
        selectedContacts.map(contact => 
          createContact({
            ...contact,
            userId: user.uid,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
        )
      );
      
      // Reload contacts after adding new ones
      const updatedContacts = await getContacts(user.uid);
      setContacts(updatedContacts);
    } catch (err) {
      setError('Failed to add contacts. Please try again.');
      console.error('Error adding contacts:', err);
    }
  };

  const handleUpdateContact = async (updatedContact: Contact) => {
    if (!user) return;

    try {
      setError(null);
      await updateContact(updatedContact.id, {
        ...updatedContact,
        updatedAt: new Date().toISOString()
      });
      
      // Update local state
      setContacts(prevContacts =>
        prevContacts.map(contact =>
          contact.id === updatedContact.id ? updatedContact : contact
        )
      );
    } catch (err) {
      setError('Failed to update contact. Please try again.');
      console.error('Error updating contact:', err);
    }
  };

  const toggleSort = () => {
    setSortOrder(current => {
      if (current === null) return 'asc';
      if (current === 'asc') return 'desc';
      return null;
    });
  };

  const sortedContacts = useMemo(() => {
    if (!sortOrder) return contacts;

    return [...contacts].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [contacts, sortOrder]);

  const filteredContacts = useMemo(() => {
    return sortedContacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sortedContacts, searchQuery]);

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
        <p className="text-lg text-gray-600">Please sign in to view your contacts.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
        <button
          onClick={() => setIsContactModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Contact
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          onClick={toggleSort}
          className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
            sortOrder ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          <ArrowUpDown className="w-5 h-5" />
          <span className="hidden sm:inline">
            {sortOrder === 'asc' ? 'A to Z' : sortOrder === 'desc' ? 'Z to A' : 'Sort'}
          </span>
        </button>
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
          <p className="text-lg text-gray-600">No contacts found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredContacts.map((contact) => (
            <ContactCard 
              key={contact.id} 
              contact={contact}
              onUpdateContact={handleUpdateContact}
            />
          ))}
        </div>
      )}

      <TelegramContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onSelectContacts={handleAddContacts}
      />
    </div>
  );
}