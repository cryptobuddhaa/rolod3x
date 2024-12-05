import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Contact } from '../types/contact';
import { nationalities } from '../data/nationalities';
import { useSettings } from '../contexts/SettingsContext';
import { validateSocialMediaLink, formatSocialMediaLink } from '../lib/utils';

interface EditContactModalProps {
  contact: Contact;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedContact: Contact) => void;
}

export function EditContactModal({ contact, isOpen, onClose, onSave }: EditContactModalProps) {
  const [formData, setFormData] = useState<Contact>(contact);
  const [isSaving, setIsSaving] = useState(false);
  const [socialMediaError, setSocialMediaError] = useState('');
  const { settings } = useSettings();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.socialMediaLink && !validateSocialMediaLink(formData.socialMediaLink)) {
      setSocialMediaError('Social media link must be from x.com or linkedin.com/in/');
      return;
    }

    setIsSaving(true);
    try {
      const updatedContact = {
        ...formData,
        socialMediaLink: formData.socialMediaLink ? formatSocialMediaLink(formData.socialMediaLink) : ''
      };
      onSave(updatedContact);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'socialMediaLink') {
      setSocialMediaError('');
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const hasChanges = JSON.stringify(contact) !== JSON.stringify(formData);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="p-3 sm:p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-base sm:text-lg font-semibold">Edit Contact</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                disabled={isSaving}
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                disabled={isSaving}
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                disabled={isSaving}
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                disabled={isSaving}
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Social Media Link
              </label>
              <input
                type="text"
                name="socialMediaLink"
                value={formData.socialMediaLink || ''}
                onChange={handleChange}
                placeholder="x.com/username or linkedin.com/in/username"
                className={`w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  socialMediaError ? 'border-red-500' : ''
                }`}
                disabled={isSaving}
              />
              {socialMediaError && (
                <p className="mt-1 text-xs text-red-500">{socialMediaError}</p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={isSaving}
              >
                <option value="">Select a category</option>
                {settings.contacts.categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Nationality
              </label>
              <select
                name="nationality"
                value={formData.nationality || ''}
                onChange={handleChange}
                className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={isSaving}
              >
                <option value="">Select nationality</option>
                {nationalities.map(nationality => (
                  <option key={nationality} value={nationality}>
                    {nationality}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Met At
              </label>
              <select
                name="metAt"
                value={formData.metAt || ''}
                onChange={handleChange}
                className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={isSaving}
              >
                <option value="">Select where you met</option>
                {settings.contacts.metAtLabels.map(label => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-3 sm:p-4 border-t border-gray-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!hasChanges || isSaving}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}