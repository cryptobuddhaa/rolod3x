export interface UserSettings {
  profile: {
    name: string;
    email: string;
    timeZone: string;
  };
  notifications: {
    taskReminders: 'None' | 'Hourly' | 'Daily' | 'Weekly';
    messageAlerts: 'None' | 'Instant' | 'Hourly' | 'Daily' | 'Weekly';
  };
  regional: {
    language: string;
    dateFormat: string;
    currency: string;
  };
  contacts: {
    categories: string[];
    metAtLabels: string[];
  };
}

export const defaultSettings: UserSettings = {
  profile: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    timeZone: 'UTC-5 (Eastern Time)',
  },
  notifications: {
    taskReminders: 'Daily',
    messageAlerts: 'Instant',
  },
  regional: {
    language: 'English (US)',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD ($)',
  },
  contacts: {
    categories: ['Client', 'Friend', 'Co-worker'],
    metAtLabels: ['Token2049', 'Bitcoin Conference', 'Paris Blockchain Week'],
  },
};