import { Message } from '../types/message';

export const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    content: 'Thanks for the project update. Can we schedule a call tomorrow?',
    timestamp: '2024-03-21T10:30:00',
    isUnread: true
  },
  {
    id: '2',
    sender: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    content: 'I\'ve reviewed the marketing materials. Looking good!',
    timestamp: '2024-03-21T09:15:00',
    isUnread: false
  },
  {
    id: '3',
    sender: 'Marcus Schmidt',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    content: 'Contract signed and sent back. Please confirm receipt.',
    timestamp: '2024-03-20T16:45:00',
    isUnread: true
  }
];