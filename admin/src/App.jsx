import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLayout } from './components/AdminLayout';

import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AboutPage } from './pages/AboutPage';
import { SkillsPage } from './pages/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { BlogsPage } from './pages/BlogsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ServicesPage } from './pages/ServicesPage';
import { MediaPage } from './pages/MediaPage';
import { MessagesPage } from './pages/MessagesPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Authentication Route */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/login" element={<Navigate to="/admin/login" replace />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<DashboardPage />} />
              <Route path="/admin/about" element={<AboutPage />} />
              <Route path="/admin/skills" element={<SkillsPage />} />
              <Route path="/admin/projects" element={<ProjectsPage />} />
              <Route path="/admin/blogs" element={<BlogsPage />} />
              <Route path="/admin/experience" element={<ExperiencePage />} />
              <Route path="/admin/testimonials" element={<TestimonialsPage />} />
              <Route path="/admin/services" element={<ServicesPage />} />
              <Route path="/admin/media" element={<MediaPage />} />
              <Route path="/admin/messages" element={<MessagesPage />} />
              <Route path="/admin/settings" element={<SettingsPage />} />
            </Route>
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
