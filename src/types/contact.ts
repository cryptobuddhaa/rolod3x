export interface Contact {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  location: string;
  category: string;
  nationality?: string;
  metAt?: string;
  lastContact: string;
  socialMediaLink?: string;
  createdAt: string;
  updatedAt: string;
}