import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Exam {
  id?: string;
  name: string;
  code: string;
  description: string;
  active: boolean;
}

export interface Subject {
  id?: string;
  name: string;
  examId: string;
  icon?: string;
}

export interface Chapter {
  id?: string;
  name: string;
  subjectId: string;
  order: number;
}

export interface Topic {
  id?: string;
  name: string;
  chapterId: string;
}

export interface Question {
  id?: string;
  text: string;
  type: 'mcq' | 'integer';
  difficulty: 'easy' | 'medium' | 'hard';
  subjectId: string;
  chapterId: string;
  topicId: string;
  options: string[];
  correctAnswer: string;
  solution?: string;
  tags?: string[];
  isPYQ?: boolean;
  year?: number;
}

// Service Functions
export const examService = {
  // Exam Categories
  async getExams() {
    const q = query(collection(db, 'exams'), where('active', '==', true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Exam));
  },

  async addExam(exam: Omit<Exam, 'id'>) {
    return await addDoc(collection(db, 'exams'), exam);
  },

  // Subjects
  async getSubjects(examId: string) {
    const q = query(collection(db, 'subjects'), where('examId', '==', examId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Subject));
  },

  // Chapters
  async getChapters(subjectId: string) {
    const q = query(collection(db, 'chapters'), where('subjectId', '==', subjectId), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Chapter));
  },

  // Topics
  async getTopics(chapterId: string) {
    const q = query(collection(db, 'topics'), where('chapterId', '==', chapterId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Topic));
  },

  // Questions
  async addQuestion(question: Omit<Question, 'id'>) {
    return await addDoc(collection(db, 'questions'), {
      ...question,
      createdAt: Date.now()
    });
  },

  async getQuestions(filters: { subjectId?: string; chapterId?: string; topicId?: string }) {
    let q = query(collection(db, 'questions'));
    if (filters.subjectId) q = query(q, where('subjectId', '==', filters.subjectId));
    if (filters.chapterId) q = query(q, where('chapterId', '==', filters.chapterId));
    if (filters.topicId) q = query(q, where('topicId', '==', filters.topicId));
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Question));
  }
};
