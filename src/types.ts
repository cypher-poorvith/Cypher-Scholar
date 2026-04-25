export enum SubjectCategory {
  COMPETITIVE = 'competitive',
  GRADES = 'grades'
}

export enum UserRole {
  SUPERADMIN = 'superadmin',
  EDITOR = 'editor',
  STUDENT = 'student',
  USER = 'user', // Keeping for compatibility
  VIEWER = 'viewer'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BLOCKED = 'blocked',
  NEW = 'new'
}

export interface UserProfile {
  id: string; // Mapping uid to id as per request
  displayName: string;
  email: string;
  photoURL?: string;
  isVerified?: boolean;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  grade?: string;
  exam?: string;
  createdAt: number;
  lastLogin: number;
  isActive: boolean;
  blocked: boolean;
  devices: string[];
  permissions: {
    uploadContent: boolean;
    manageUsers: boolean;
    viewAnalytics: boolean;
    deleteContent: boolean;
    createAnnouncements: boolean;
    editAppStructure: boolean;
  };
  onboardingComplete?: boolean;
  academicDetails?: {
    grade: string;
    stream?: string;
    year?: string;
    branch?: string;
    targets: string[];
    institution?: string;
    city?: string;
  };
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: 'create' | 'update' | 'delete' | 'login';
  targetType: 'user' | 'content' | 'test' | 'system';
  targetId: string;
  targetName: string;
  timestamp: number;
  ipAddress: string;
  userAgent: string;
  before?: Record<string, any>;
  after?: Record<string, any>;
}

export interface Content {
  id: string;
  type: 'pdf' | 'video' | 'question' | 'test';
  title: string;
  subject: string;
  chapter: string;
  uploadedBy: string;
  uploadedAt: number;
  url: string;
  metadata: Record<string, any>;
  views: number;
  downloads: number;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  targetAudience: 'all' | 'students' | 'editors';
  publishDate: number;
  expiryDate?: number;
  active: boolean;
  views: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  order: number;
  category: SubjectCategory;
}

export interface Chapter {
  id: string;
  subjectId: string;
  name: string;
  order: number;
}

export enum ContentType {
  PDF = 'pdf',
  VIDEO = 'video',
  LINK = 'link'
}

export interface ContentItem {
  id: string;
  chapterId: string;
  type: ContentType;
  title: string;
  body?: string;
  url?: string;
  order: number;
}

export interface Question {
  id: string;
  chapterId: string;
  type: 'mcq' | 'subjective';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  answer: string;
  solution: string;
}

export interface UserProgress {
  id: string;
  userId: string;
  testId: string;
  score: number;
  attempted: number;
  correct: number;
  attemptedAt: number;
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerInfo: { providerId: string; displayName: string; email: string; }[];
  }
}
