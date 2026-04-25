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
  // We'll use a single endpoint for the tree for performance in this local version
  async getExams() {
    const response = await fetch('/api/exam-tree');
    const data = await response.json();
    return data.exams || [];
  },

  async addExam(exam: Omit<Exam, 'id'>) {
    const current = await this.getExamTree();
    const newExam = { ...exam, id: Math.random().toString(36).substr(2, 9) };
    current.exams.push(newExam);
    await this.saveExamTree(current);
    return { id: newExam.id };
  },

  async getExamTree() {
    const response = await fetch('/api/exam-tree');
    return await response.json();
  },

  async saveExamTree(tree: any) {
    await fetch('/api/exam-tree', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tree)
    });
  },

  // Subjects
  async getSubjects(examId: string) {
    const tree = await this.getExamTree();
    return (tree.subjects || []).filter((s: any) => s.examId === examId);
  },

  // Chapters
  async getChapters(subjectId: string) {
    const tree = await this.getExamTree();
    return (tree.chapters || []).filter((c: any) => c.subjectId === subjectId);
  },

  // Topics
  async getTopics(chapterId: string) {
    const tree = await this.getExamTree();
    return (tree.topics || []).filter((t: any) => t.chapterId === chapterId);
  },

  // Questions
  async addQuestion(question: Omit<Question, 'id'>) {
    const response = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(question)
    });
    return await response.json();
  },

  async getQuestions(filters: { subjectId?: string; chapterId?: string; topicId?: string }) {
    const queryParams = new URLSearchParams(filters as any).toString();
    const response = await fetch(`/api/questions?${queryParams}`);
    return await response.json();
  }
};

