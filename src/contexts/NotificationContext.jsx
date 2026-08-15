import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load from localStorage on user login
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`notifications_${user.uid}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setNotifications(parsed);
        setUnreadCount(parsed.filter(n => !n.read).length);
      }
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user]);

  // Save to localStorage when notifications change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`notifications_${user.uid}`, JSON.stringify(notifications));
    }
  }, [notifications, user]);

  const addNotification = (message, type = 'info') => {
    const newNotif = {
      id: Date.now() + Math.random(),
      message,
      type, // 'info', 'success', 'warning', 'error'
      read: false,
      timestamp: new Date().toISOString(),
    };
    setNotifications(prev => [newNotif, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
    if (user) {
      localStorage.removeItem(`notifications_${user.uid}`);
    }
  };

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAllRead,
    markRead,
    clearAll,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}