import React, { useState } from 'react';
import { Bell, User, Globe, Tags } from 'lucide-react';
import { timeZones } from '../data/timeZones';
import { languages } from '../data/languages';
import { dateFormats } from '../data/dateFormats';
import { currencies } from '../data/currencies';
import { LabelManager } from '../components/LabelManager';
import { useSettings } from '../contexts/SettingsContext';

export function SettingsPage() {
  const { settings, updateSettings } = useSettings();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(settings.profile.name);
  const [editedEmail, setEditedEmail] = useState(settings.profile.email);

  const handleSave = () => {
    updateSettings({
      ...settings,
      profile: {
        ...settings.profile,
        name: editedName,
        email: editedEmail,
      }
    });
    setIsEditing(false);
  };

  const updateSettingsField = (section: keyof typeof settings, field: string, value: any) => {
    updateSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value
      }
    });
  };

  const handleCategoryLabelsUpdate = (newLabels: string[]) => {
    updateSettings({
      ...settings,
      contacts: {
        ...settings.contacts,
        categories: newLabels
      }
    });
  };

  const handleMetAtLabelsUpdate = (newLabels: string[]) => {
    updateSettings({
      ...settings,
      contacts: {
        ...settings.contacts,
        metAtLabels: newLabels
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

      {/* Profile Settings */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Profile Settings</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Name</span>
            {isEditing ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="border rounded p-1"
              />
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-gray-900">{settings.profile.name}</span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Email</span>
            {isEditing ? (
              <input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className="border rounded p-1"
              />
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-gray-900">{settings.profile.email}</span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Time Zone</span>
            <select
              value={settings.profile.timeZone}
              onChange={(e) => updateSettingsField('profile', 'timeZone', e.target.value)}
              className="border rounded p-1"
            >
              {timeZones.map(zone => (
                <option key={zone} value={zone}>{zone}</option>
              ))}
            </select>
          </div>

          {isEditing && (
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Task Reminders</span>
            <select
              value={settings.notifications.taskReminders}
              onChange={(e) => updateSettingsField('notifications', 'taskReminders', e.target.value)}
              className="border rounded p-1"
            >
              <option value="None">None</option>
              <option value="Hourly">Hourly</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Message Alerts</span>
            <select
              value={settings.notifications.messageAlerts}
              onChange={(e) => updateSettingsField('notifications', 'messageAlerts', e.target.value)}
              className="border rounded p-1"
            >
              <option value="None">None</option>
              <option value="Instant">Instant</option>
              <option value="Hourly">Hourly</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Regional */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Regional</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Language</span>
            <select
              value={settings.regional.language}
              onChange={(e) => updateSettingsField('regional', 'language', e.target.value)}
              className="border rounded p-1"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Date Format</span>
            <select
              value={settings.regional.dateFormat}
              onChange={(e) => updateSettingsField('regional', 'dateFormat', e.target.value)}
              className="border rounded p-1"
            >
              {dateFormats.map(format => (
                <option key={format} value={format}>{format}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Currency</span>
            <select
              value={settings.regional.currency}
              onChange={(e) => updateSettingsField('regional', 'currency', e.target.value)}
              className="border rounded p-1"
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Contacts */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Tags className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Contacts</h2>
        </div>
        <div className="space-y-6">
          <LabelManager
            title="Category Labels"
            labels={settings.contacts.categories}
            maxLabels={5}
            onUpdateLabels={handleCategoryLabelsUpdate}
          />

          <LabelManager
            title="Met At Labels"
            labels={settings.contacts.metAtLabels}
            maxLabels={8}
            onUpdateLabels={handleMetAtLabelsUpdate}
          />
        </div>
      </div>
    </div>
  );
}