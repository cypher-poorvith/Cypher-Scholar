/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SubjectPage from './pages/SubjectPage';
import Exams from './pages/Exams';
import Simulations from './pages/Simulations';
import Pricing from './pages/Pricing';
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
import StudentLayout from './components/layout/StudentLayout';
import EditorLayout from './components/layout/EditorLayout';
import EditorDashboard from './pages/EditorDashboard';

import AdminDashboard from './pages/AdminDashboard';

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
  const { user, profile, loading, role, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) return <Loader size="full" label="SYSTEM INITIALIZING..." />;
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If user exists but profile doesn't (race condition), wait a bit or show error
  if (!role && profile === null && !loading && !isAdmin) {
     // Profile might still be loading or being created
     return <Loader size="full" label="SYNCING PROFILE..." />;
  }

  if (roles && !isAdmin && role && !roles.includes(role)) {
    return <Navigate to="/dashboard" />;
  }

  // Onboarding Check
  // If profile incomplete, redirect to onboarding (except on onboarding page itself)
  if (role === UserRole.STUDENT && profile && !profile.onboardingComplete && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" />;
  }

  return <>{children}</>;
};

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader size="full" label="AUTHENTICATING..." />;
  if (user) return <Navigate to="/dashboard" />;
  return <>{children}</>;
};

function AppContent() {
  const { user, effectiveRole, isAdmin } = useAuth();
  const location = useLocation();

  const renderContent = (content: React.ReactNode) => {
    if (isAdmin || effectiveRole === UserRole.SUPERADMIN) {
      return <SuperadminLayout>{content}</SuperadminLayout>;
    }
    if (effectiveRole === UserRole.EDITOR) {
      return <EditorLayout>{content}</EditorLayout>;
    }
    return <StudentLayout>{content}</StudentLayout>;
  };

  return (
    <div className="min-h-screen bg-surface-bg transition-colors duration-300">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public / Landing */}
          <Route path="/" element={renderContent(<Landing />)} />
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
          <Route path="/auth" element={<Navigate to="/login" />} />
          
          {/* Student Hub Sections */}
          <Route path="/subjects/:category" element={renderContent(<SubjectPage />)} />
          <Route path="/subject/:id" element={renderContent(<SubjectDetail />)} />
          <Route path="/topic/:id" element={renderContent(<TopicDetail />)} />
          <Route path="/exams" element={renderContent(<Exams />)} />
          <Route path="/simulations" element={renderContent(<Simulations />)} />
          <Route path="/pricing" element={renderContent(<Pricing />)} />
          <Route path="/grades" element={renderContent(<GradesPage />)} />
          <Route path="/practice" element={renderContent(<PracticeZone />)} />
          <Route path="/scholar-series" element={renderContent(<ScholarSeries />)} />
          <Route path="/about" element={renderContent(<About />)} />
          <Route path="/feedback" element={renderContent(<Feedback />)} />
          <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
          
          {/* Private Student Routes */}
          <Route path="/dashboard" element={<ProtectedRoute roles={[UserRole.STUDENT, UserRole.EDITOR, UserRole.SUPERADMIN]}>{renderContent(<Dashboard />)}</ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute>{renderContent(<Profile />)}</ProtectedRoute>} />
          <Route path="/results/latest" element={<ProtectedRoute>{renderContent(<TestResult />)}</ProtectedRoute>} />
          <Route path="/tests/configure" element={<ProtectedRoute>{renderContent(<TestConfig />)}</ProtectedRoute>} />
          <Route path="/tests/active" element={<TestInterface />} />

          {/* Editor Routes */}
          <Route element={<EditorLayout />}>
            <Route path="/editor/dashboard" element={<ProtectedRoute roles={[UserRole.EDITOR, UserRole.SUPERADMIN]}><EditorDashboard /></ProtectedRoute>} />
            <Route path="/editor/content" element={<ProtectedRoute roles={[UserRole.EDITOR, UserRole.SUPERADMIN]}><ContentManagement /></ProtectedRoute>} />
            <Route path="/editor/tests" element={<ProtectedRoute roles={[UserRole.EDITOR, UserRole.SUPERADMIN]}><TestManagement /></ProtectedRoute>} />
            <Route path="/editor/verify" element={<ProtectedRoute roles={[UserRole.EDITOR, UserRole.SUPERADMIN]}><div className="text-primary font-bold uppercase tracking-widest p-10">Results Verification (Editor)</div></ProtectedRoute>} />
          </Route>

          {/* Admin Dedicated Routes */}
          <Route path="/admin" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/overview" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderContent(<Analytics />)}</ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderContent(<UsersManagement />)}</ProtectedRoute>} />
          <Route path="/admin/team" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderContent(<TeamManagement />)}</ProtectedRoute>} />
          <Route path="/admin/content" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderContent(<ContentManagement />)}</ProtectedRoute>} />
          <Route path="/admin/tests" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderContent(<TestManagement />)}</ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderContent(<Analytics />)}</ProtectedRoute>} />
          <Route path="/admin/audit" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderContent(<AuditLogs />)}</ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderContent(<AppSettings />)}</ProtectedRoute>} />
          <Route path="/admin/announcements" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderContent(<Announcements />)}</ProtectedRoute>} />
          <Route path="/admin/structure" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderContent(<div className="text-primary font-bold uppercase tracking-widest p-10">App Structure Tool</div>)}</ProtectedRoute>} />
          <Route path="/admin/verify" element={<ProtectedRoute roles={[UserRole.SUPERADMIN]}>{renderContent(<div className="text-primary font-bold uppercase tracking-widest p-10">Admin Results Verification</div>)}</ProtectedRoute>} />

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
        <ThemeProvider>
          <AuthProvider>
             <AppContent />
          </AuthProvider>
        </ThemeProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

