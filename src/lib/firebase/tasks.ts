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
import { Task } from '../../types/task';

const TASKS_COLLECTION = 'tasks';

export async function getTasks(userId: string): Promise<Task[]> {
  const q = query(
    collection(db, TASKS_COLLECTION),
    where('userId', '==', userId),
    orderBy('dueDate')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Task));
}

export async function getTask(taskId: string): Promise<Task | null> {
  const docRef = doc(db, TASKS_COLLECTION, taskId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as Task;
  }
  
  return null;
}

export async function createTask(task: Omit<Task, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, TASKS_COLLECTION), task);
  return docRef.id;
}

export async function updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
  const docRef = doc(db, TASKS_COLLECTION, taskId);
  await updateDoc(docRef, updates);
}

export async function deleteTask(taskId: string): Promise<void> {
  const docRef = doc(db, TASKS_COLLECTION, taskId);
  await deleteDoc(docRef);
}