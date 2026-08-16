import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';

/**
 * Root Application Entry Point
 * Mounts the React application into the DOM and wraps the core component tree 
 * with the global Authentication, Notification, and Accessibility Context providers.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <NotificationProvider>
        <AccessibilityProvider>
          <App />
        </AccessibilityProvider>
      </NotificationProvider>
    </AuthProvider>
  </React.StrictMode>
);