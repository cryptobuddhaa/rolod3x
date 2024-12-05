import { 
  collection, 
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from './config';
import { Contact } from '../../types/contact';

const CONTACTS_COLLECTION = 'contacts';

export async function getContacts(userId: string): Promise<Contact[]> {
  const q = query(
    collection(db, CONTACTS_COLLECTION),
    where('userId', '==', userId),
    orderBy('name')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Contact));
}

export async function getContact(contactId: string): Promise<Contact | null> {
  const docRef = doc(db, CONTACTS_COLLECTION, contactId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as Contact;
  }
  
  return null;
}

export async function createContact(contact: Omit<Contact, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, CONTACTS_COLLECTION), contact);
  return docRef.id;
}

export async function updateContact(contactId: string, updates: Partial<Contact>): Promise<void> {
  const docRef = doc(db, CONTACTS_COLLECTION, contactId);
  await updateDoc(docRef, updates);
}

export async function deleteContact(contactId: string): Promise<void> {
  const docRef = doc(db, CONTACTS_COLLECTION, contactId);
  await deleteDoc(docRef);
}