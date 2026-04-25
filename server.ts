import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const SECRET_KEY = process.env.JWT_SECRET || 'super-secret-key-123';
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const EXAMS_FILE = path.join(DATA_DIR, 'exams.json');
const QUESTIONS_FILE = path.join(DATA_DIR, 'questions.json');
const AUDIT_LOGS_FILE = path.join(DATA_DIR, 'audit_logs.json');
const SUBJECTS_FILE = path.join(DATA_DIR, 'subjects.json');

async function ensureDataFiles() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    for (const file of [USERS_FILE, EXAMS_FILE, QUESTIONS_FILE, AUDIT_LOGS_FILE, SUBJECTS_FILE]) {
      try {
        await fs.access(file);
      } catch {
        const defaultData = file === USERS_FILE || file === AUDIT_LOGS_FILE || file === SUBJECTS_FILE 
          ? [] 
          : { exams: [], subjects: [], chapters: [], topics: [] };
        await fs.writeFile(file, JSON.stringify(defaultData));
      }
    }
  } catch (err) {
    console.error('Error ensuring data files:', err);
  }
}

async function startServer() {
  await ensureDataFiles();
  const app = express();

  app.use(express.json({ limit: '10mb' }));
  app.use(cookieParser());
  app.use(cors({ origin: true, credentials: true }));

  // Helper to read/write JSON
  const readJSON = async (file: string) => JSON.parse(await fs.readFile(file, 'utf-8'));
  const writeJSON = async (file: string, data: any) => await fs.writeFile(file, JSON.stringify(data, null, 2));

  const auditLog = async (userId: string, action: string, target: string, details?: any) => {
    try {
      const logs = await readJSON(AUDIT_LOGS_FILE);
      logs.push({
        id: Math.random().toString(36).substr(2, 9),
        userId,
        action,
        target,
        details,
        timestamp: Date.now()
      });
      await writeJSON(AUDIT_LOGS_FILE, logs);
    } catch (err) {
      console.error('Audit log failed:', err);
    }
  };

  // --- Auth Middeleware ---
  const authenticate = (req: any, res: any, next: any) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
    } catch {
      res.status(401).json({ error: 'Invalid token' });
    }
  };

  // --- Auth Routes ---
  app.post('/api/auth/signup', async (req, res) => {
    const { email, password, displayName } = req.body;
    const users = await readJSON(USERS_FILE);
    if (users.find((u: any) => u.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password: hashedPassword,
      displayName,
      role: email === 'poorvith519@gmail.com' ? 'superadmin' : 'user',
      createdAt: Date.now()
    };
    users.push(newUser);
    await writeJSON(USERS_FILE, users);
    
    await auditLog(newUser.id, 'SIGNUP', 'USER', { email: newUser.email });
    
    // Auto-login after signup
    const { password: _, ...userWithoutPassword } = newUser;
    const token = jwt.sign(userWithoutPassword, SECRET_KEY, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
    res.json({ user: userWithoutPassword, token });
  });

  app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const users = await readJSON(USERS_FILE);
    const user = users.find((u: any) => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const { password: _, ...userWithoutPassword } = user;
    const token = jwt.sign(userWithoutPassword, SECRET_KEY, { expiresIn: '7d' });
    
    await auditLog(user.id, 'LOGIN', 'SESSION', { email: user.email });

    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
    res.json({ user: userWithoutPassword, token });
  });

  app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ success: true });
  });

  app.get('/api/auth/me', authenticate, (req: any, res) => {
    res.json({ user: req.user });
  });

  // --- Admin Routes ---
  app.get('/api/admin/users', authenticate, async (req: any, res) => {
    if (req.user.role !== 'superadmin') return res.status(403).json({ error: 'Forbidden' });
    const users = await readJSON(USERS_FILE);
    // Remove passwords for safety
    res.json(users.map(({ password: _, ...u }: any) => u));
  });

  app.post('/api/admin/users/:id/role', authenticate, async (req: any, res) => {
    if (req.user.role !== 'superadmin') return res.status(403).json({ error: 'Forbidden' });
    const { role, permissions } = req.body;
    const users = await readJSON(USERS_FILE);
    const index = users.findIndex((u: any) => u.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'User not found' });
    users[index] = { ...users[index], role, permissions };
    await writeJSON(USERS_FILE, users);
    res.json({ success: true });
  });

  app.post('/api/admin/users/:id/block', authenticate, async (req: any, res) => {
    if (req.user.role !== 'superadmin') return res.status(403).json({ error: 'Forbidden' });
    const { blocked } = req.body;
    const users = await readJSON(USERS_FILE);
    const index = users.findIndex((u: any) => u.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'User not found' });
    users[index] = { ...users[index], blocked };
    await writeJSON(USERS_FILE, users);
    res.json({ success: true });
  });

  app.delete('/api/admin/users/:id', authenticate, async (req: any, res) => {
    if (req.user.role !== 'superadmin') return res.status(403).json({ error: 'Forbidden' });
    let users = await readJSON(USERS_FILE);
    users = users.filter((u: any) => u.id !== req.params.id);
    await writeJSON(USERS_FILE, users);
    res.json({ success: true });
  });

  app.get('/api/admin/audit-logs', authenticate, async (req: any, res) => {
    if (req.user.role !== 'superadmin' && req.user.role !== 'editor') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const logs = await readJSON(AUDIT_LOGS_FILE);
    res.json(logs.slice(-100).reverse()); // Return last 100 logs
  });

  app.get('/api/subjects', async (req, res) => {
    const { category } = req.query;
    let subjects = await readJSON(path.join(DATA_DIR, 'subjects.json'));
    if (!subjects) subjects = [];
    
    if (category && category !== 'all') {
      subjects = subjects.filter((s: any) => s.category === category);
    }
    
    subjects.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
    res.json(subjects);
  });

  // --- Other Data Routes ---
  app.post('/api/user/profile', authenticate, async (req: any, res) => {
    const users = await readJSON(USERS_FILE);
    const index = users.findIndex((u: any) => u.id === req.user.id);
    if (index === -1) return res.status(404).json({ error: 'User not found' });
    users[index] = { ...users[index], ...req.body };
    await writeJSON(USERS_FILE, users);
    res.json({ success: true });
  });

  // --- Exam/Content Routes ---
  app.get('/api/exam-tree', async (req, res) => {
    res.json(await readJSON(EXAMS_FILE));
  });

  app.post('/api/exam-tree', authenticate, async (req, res) => {
    await writeJSON(EXAMS_FILE, req.body);
    res.json({ success: true });
  });

  app.get('/api/questions', async (req, res) => {
    const { topicId } = req.query;
    const all = await readJSON(QUESTIONS_FILE);
    if (topicId) {
      const topicQuestions = (all.questions || []).filter((q: any) => q.topicId === topicId);
      return res.json(topicQuestions);
    }
    res.json(all.questions || []);
  });

  app.post('/api/questions', authenticate, async (req, res) => {
    const all = await readJSON(QUESTIONS_FILE);
    if (!all.questions) all.questions = [];
    const newQuestion = { ...req.body, id: Math.random().toString(36).substr(2, 9) };
    all.questions.push(newQuestion);
    await writeJSON(QUESTIONS_FILE, all);
    res.json(newQuestion);
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
