import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { useAuth } from './context/AuthContext.tsx';

import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import StudentDashboard from './pages/StudentDashboard.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import Payment from './pages/Payment.tsx';
import ApplicationForm from './pages/ApplicationForm.tsx';

import Academics from './pages/Academics.tsx';
import Faculties from './pages/Faculties.tsx';
import Admissions from './pages/Admissions.tsx';
import Contact from './pages/Contact.tsx';
import About from './pages/About.tsx';

import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';

type ProtectedRouteProps = {
  children: React.ReactNode;
  role?: string;
};

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {!isAdminPage && <Navbar />}

      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>

            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/academics" element={<Academics />} />
            <Route path="/faculties" element={<Faculties />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />

            {/* STUDENT ROUTES */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute role="student">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/buy-form"
              element={
                <ProtectedRoute role="student">
                  <Payment />
                </ProtectedRoute>
              }
            />

            <Route
              path="/apply"
              element={
                <ProtectedRoute role="student">
                  <ApplicationForm />
                </ProtectedRoute>
              }
            />

            {/* ADMIN ROUTE */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="h-screen flex flex-col items-center justify-center">
                  <h1 className="text-5xl font-bold mb-4">404</h1>
                  <p className="text-slate-600">Page Not Found</p>
                </div>
              }
            />

          </Routes>
        </AnimatePresence>
      </main>

      {!isAdminPage && <Footer />}
    </div>
  );
}