import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { mockContacts } from '../data/mockContacts';
import { ensureValidImageUrl } from '../lib/utils';

interface ContactSearchFieldProps {
  value: string;
  onChange: (contactName: string) => void;
  placeholder?: string;
}

export function ContactSearchField({ value, onChange, placeholder }: ContactSearchFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleContactSelect = (contactName: string) => {
    onChange(contactName);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={searchTerm || value}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder || "Search contacts..."}
          className="w-full pl-7 sm:pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isOpen && filteredContacts.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {filteredContacts.map(contact => {
            const avatarUrl = ensureValidImageUrl(contact.avatar);
            return (
              <div
                key={contact.email}
                onClick={() => handleContactSelect(contact.name)}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer"
              >
                {avatarUrl && (
                  <img
                    src={avatarUrl}
                    alt={contact.name}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                  />
                )}
                <div>
                  <div className="font-medium text-sm sm:text-base">{contact.name}</div>
                  <div className="text-xs sm:text-sm text-gray-500">{contact.email}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}