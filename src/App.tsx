/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SubjectPage from './pages/SubjectPage';
import ExamsPage from './pages/ExamsPage';
import GradesPage from './pages/GradesPage';
import PracticeZone from './pages/PracticeZone';
import SubjectDetail from './pages/SubjectDetail';
import TopicDetail from './pages/TopicDetail';
import TestConfig from './pages/TestConfig';
import TestInterface from './pages/TestInterface';
import TestResult from './pages/TestResult';
import Profile from './pages/Profile';
import About from './pages/About';
import Feedback from './pages/Feedback';
import Onboarding from './pages/Onboarding';
import ScholarSeries from './pages/ScholarSeries';
import ResultsHub from './pages/ResultsHub';
import StudentLayout from './components/layout/StudentLayout';
import EditorLayout from './components/layout/EditorLayout';
import EditorDashboard from './pages/EditorDashboard';

// Admin Pages
import UsersManagement from './pages/admin/UsersManagement';
import TeamManagement from './pages/admin/TeamManagement';
import ContentManagement from './pages/admin/ContentManagement';
import TestManagement from './pages/admin/TestManagement';
import Analytics from './pages/admin/Analytics';
import AuditLogs from './pages/admin/AuditLogs';
import AppSettings from './pages/admin/AppSettings';
import Announcements from './pages/admin/Announcements';

import SuperadminLayout from './components/layout/SuperadminLayout';
import Loader from './components/ui/Loader';
import { UserRole } from './types';
import { AnimatePresence } from 'motion/react';

const ProtectedRoute = ({ children, roles }: { children: React.ReactNode, roles?: UserRole[] }) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader size="full" label="LOADING..." />;
  if (!user) return <Navigate to="/login" />;

  if (roles && profile && !roles.includes(profile.role)) {
    return <Navigate to="/dashboard" />;
  }

  // Onboarding Check (Only for students)
  if (profile && profile.role === UserRole.USER && !profile.onboardingComplete && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" />;
  }

  return <>{children}</>;
};

function AppContent() {
  const { user } = useAuth();
  const location = useLocation();

  const renderStudent = (content: React.ReactNode) => (
    <StudentLayout>{content}</StudentLayout>
  );

  const renderAdmin = (content: React.ReactNode) => (
    <SuperadminLayout>{content}</SuperadminLayout>
  );

  return (
    <div className="min-h-screen bg-[#070512]">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public / Landing */}
          <Route path="/" element={renderStudent(<Landing />)} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth" element={<Navigate to="/login" />} />
          
          {/* Student Hub Sections */}
          <Route path="/subjects/:category" element={renderStudent(<SubjectPage />)} />
          <Route path="/subject/:id" element={renderStudent(<SubjectDetail />)} />
          <Route path="/topic/:id" element={renderStudent(<TopicDetail />)} />
          <Route path="/exams" element={renderStudent(<ExamsPage />)} />
          <Route path="/grades" element={renderStudent(<GradesPage />)} />
          <Route path="/practice" element={renderStudent(<PracticeZone />)} />
          <Route path="/scholar-series" element={renderStudent(<ScholarSeries />)} />
          <Route path="/results" element={renderStudent(<ResultsHub />)} />
          <Route path="/about" element={renderStudent(<About />)} />
          <Route path="/feedback" element={renderStudent(<Feedback />)} />
          <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
          
          {/* Private Student Routes */}
          <Route path="/dashboard" element={<ProtectedRoute roles={[UserRole.USER, UserRole.EDITOR, UserRole.SUPERADMIN]}>{renderStudent(<Dashboard />)}</ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute>{renderStudent(<Profile />)}</ProtectedRoute>} />
          <Route path="/results/latest" element={<ProtectedRoute>{renderStudent(<TestResult />)}</ProtectedRoute>} />
          <Route path="/tests/configure" element={<ProtectedRoute>{renderStudent(<TestConfig />)}</ProtectedRoute>} />
          <Route path="/tests/active" element={<TestInterface />} />

          {/* Editor Routes */}
          <Route element={<EditorLayout />}>
            <Route path="/editor/dashboard" element={<ProtectedRoute roles={[UserRole.EDITOR, UserRole.SUPERADMIN]}><EditorDashboard /></ProtectedRoute>} />
            <Route path="/editor/content" element={<ProtectedRoute roles={[UserRole.EDITOR, UserRole.SUPERADMIN]}><ContentManagement /></ProtectedRoute>} />
            <Route path="/editor/tests" element={<ProtectedRoute roles={[UserRole.EDITOR, UserRole.SUPERADMIN]}><TestManagement /></ProtectedRoute>} />
            <Route path="/editor/verify" element={<ProtectedRoute roles={[UserRole.EDITOR, UserRole.SUPERADMIN]}><div className="text-white">Results Verification (Editor)</div></ProtectedRoute>} />
          </Route>

          {/* Admin Dedicated Routes */}
          <Route path="/admin/overview" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderAdmin(<Analytics />)}</ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderAdmin(<UsersManagement />)}</ProtectedRoute>} />
          <Route path="/admin/team" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderAdmin(<TeamManagement />)}</ProtectedRoute>} />
          <Route path="/admin/content" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderAdmin(<ContentManagement />)}</ProtectedRoute>} />
          <Route path="/admin/tests" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderAdmin(<TestManagement />)}</ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderAdmin(<Analytics />)}</ProtectedRoute>} />
          <Route path="/admin/audit" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderAdmin(<AuditLogs />)}</ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderAdmin(<AppSettings />)}</ProtectedRoute>} />
          <Route path="/admin/announcements" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderAdmin(<Announcements />)}</ProtectedRoute>} />
          <Route path="/admin/structure" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderAdmin(<div className="text-white">App Structure Tool</div>)}</ProtectedRoute>} />
          <Route path="/admin/verify" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderAdmin(<div className="text-white">Admin Results Verification</div>)}</ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
           <AppContent />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

