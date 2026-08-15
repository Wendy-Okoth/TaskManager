import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

/**
 * Notification Bell Component
 * Displays a bell icon with unread count badge.
 * Opens a dropdown with notifications when clicked.
 * Supports mark as read, mark all read, and clear all.
 */
const NotificationBell = () => {
  const { notifications, unreadCount, markRead, markAllRead, clearAll } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Get icon based on notification type
  const getIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '🚨';
      case 'warning': return '⚠️';
      default: return '📌';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative p-1.5 rounded hover:bg-ledger-pale transition text-ledger-tinted"
        aria-label="Notifications"
      >
        <Bell size={20} strokeWidth={1.5} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-ledger-brick text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-ledger-card border border-ledger-pale rounded shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center px-4 py-2 border-b border-ledger-pale sticky top-0 bg-ledger-card">
            <span className="font-medium text-ledger-text text-sm">Notifications</span>
            <div className="flex gap-2">
              {notifications.length > 0 && (
                <>
                  <button
                    onClick={markAllRead}
                    className="text-xs text-ledger-tinted hover:text-ledger-text"
                  >
                    Mark all read
                  </button>
                  <button
                    onClick={clearAll}
                    className="text-xs text-ledger-brick hover:text-red-700"
                  >
                    Clear all
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="divide-y divide-ledger-pale">
            {notifications.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-ledger-tinted">
                No notifications
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`px-4 py-3 text-sm transition cursor-pointer ${
                    notif.read ? 'opacity-70' : 'bg-ledger-indigo/5'
                  }`}
                  onClick={() => markRead(notif.id)}
                >
                  <p className="text-ledger-text">
                    {getIcon(notif.type)} {notif.message}
                  </p>
                  <span className="text-xs text-ledger-tinted">
                    {new Date(notif.timestamp).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;