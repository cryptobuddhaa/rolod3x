export interface Message {
  id: string;
  userId: string;
  contactId: string;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  isUnread: boolean;
}