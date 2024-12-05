import React, { useState } from 'react';
import { Phone, Mail, MapPin, Calendar, Users, Flag, MapPinned, Edit2, Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Contact } from '../types/contact';
import { EditContactModal } from './EditContactModal';
import { ensureValidImageUrl } from '../lib/utils';

interface ContactCardProps {
  contact: Contact;
  onUpdateContact?: (updatedContact: Contact) => void;
}

export function ContactCard({ contact, onUpdateContact }: ContactCardProps) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEditModal(true);
  };

  const handleSaveContact = (updatedContact: Contact) => {
    if (onUpdateContact) {
      onUpdateContact(updatedContact);
    }
  };

  const handleSocialMediaClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank');
  };

  const avatarUrl = ensureValidImageUrl(contact.avatar);

  const contactDetails = [
    { icon: Phone, label: 'Phone', value: contact.phone },
    { icon: Mail, label: 'Email', value: contact.email },
    { icon: MapPin, label: 'Location', value: contact.location },
    { icon: Users, label: 'Category', value: contact.category },
    { icon: Flag, label: 'Nationality', value: contact.nationality },
    { icon: MapPinned, label: 'Met at', value: contact.metAt },
    { icon: Calendar, label: 'Last Contact', value: contact.lastContact },
    { 
      icon: Link, 
      label: 'Social Media', 
      value: contact.socialMediaLink,
      isLink: true
    },
  ];

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm transition-all duration-200 ${
        isExpanded ? 'ring-2 ring-blue-500 shadow-md' : 'hover:shadow-md'
      }`}
    >
      <div 
        className="p-3 sm:p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-3">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt={contact.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-gray-100"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm sm:text-base font-semibold truncate">{contact.name}</h3>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {contact.category}
                </span>
                <button
                  onClick={handleEditClick}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 mb-1">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="truncate">{contact.email}</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="truncate">{contact.location}</span>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-2 border-t border-gray-100">
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {contactDetails.map(({ icon: Icon, label, value, isLink }) => (
              value && (
                <div key={label} className="flex items-center gap-2 text-gray-600">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs text-gray-500">{label}</span>
                    {isLink ? (
                      <button
                        onClick={(e) => handleSocialMediaClick(e, value)}
                        className="block text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline truncate"
                      >
                        {value.replace('https://', '')}
                      </button>
                    ) : (
                      <p className="text-xs sm:text-sm font-medium truncate">{value}</p>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      <EditContactModal
        contact={contact}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveContact}
      />
    </div>
  );
}