import { Contact } from '../../types/contact';

export interface TelegramContact {
  user_id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  phone_number?: string;
  photo_url?: string;
}

export async function getTelegramContacts(webApp: any): Promise<Contact[]> {
  try {
    // Request contacts access through Telegram Mini App
    const result = await webApp.requestContact();
    
    if (!result) {
      throw new Error('Contact access denied');
    }

    // Get contacts through Telegram Mini App API
    const contacts = await webApp.getContacts();
    
    // Transform Telegram contacts to our app's format
    return contacts.map((contact: TelegramContact) => ({
      name: `${contact.first_name} ${contact.last_name || ''}`.trim(),
      avatar: contact.photo_url || '',
      phone: contact.phone_number || '',
      email: '', // Telegram doesn't provide email
      location: '', // Location needs to be added manually
      category: 'Telegram Contact',
      lastContact: new Date().toISOString(),
      socialMediaLink: contact.username ? `https://t.me/${contact.username}` : ''
    }));
  } catch (error) {
    console.error('Error fetching Telegram contacts:', error);
    throw error;
  }
}