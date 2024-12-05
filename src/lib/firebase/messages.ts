import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';
import { Message } from '../../types/message';

const MESSAGES_COLLECTION = 'messages';

export async function getMessages(userId: string, contactId: string): Promise<Message[]> {
  const q = query(
    collection(db, MESSAGES_COLLECTION),
    where('userId', '==', userId),
    where('contactId', '==', contactId),
    orderBy('timestamp', 'desc'),
    limit(50)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    timestamp: (doc.data().timestamp as Timestamp).toDate().toISOString()
  } as Message));
}

export async function createMessage(message: Omit<Message, 'id'>): Promise<string> {
  const messageWithTimestamp = {
    ...message,
    timestamp: Timestamp.now()
  };
  const docRef = await addDoc(collection(db, MESSAGES_COLLECTION), messageWithTimestamp);
  return docRef.id;
}

export async function markMessageAsRead(messageId: string): Promise<void> {
  const docRef = doc(db, MESSAGES_COLLECTION, messageId);
  await updateDoc(docRef, { isUnread: false });
}

export async function getUnreadCount(userId: string, contactId: string): Promise<number> {
  const q = query(
    collection(db, MESSAGES_COLLECTION),
    where('userId', '==', userId),
    where('contactId', '==', contactId),
    where('isUnread', '==', true)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.size;
}