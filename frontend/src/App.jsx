import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { AuthProvider } from './hooks/useAuth.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import Header from './components/common/Header.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TaskList from './pages/TaskList.jsx'; // Renamed import for clarity

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* Header is now outside Routes to appear on all pages */}
          <Header />
          <main className="container mx-auto p-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Redirect root to dashboard for authenticated users */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <TaskList />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all route to redirect to dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
