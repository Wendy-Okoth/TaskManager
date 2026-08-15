import { useEffect, useRef } from 'react';
import { useNotifications } from '../contexts/NotificationContext';

/**
 * Hook to check task due dates and send notifications for:
 * - 24h before due date
 * - 1h before due date
 * - Overdue tasks
 * Runs every minute and uses a Set to avoid duplicate notifications.
 */
export function useDueDateReminders(tasks) {
  const { addNotification } = useNotifications();
  const sentReminders = useRef(new Set());

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      tasks.forEach(task => {
        if (!task.dueDate || task.status === 'Done') return;
        const due = new Date(task.dueDate);
        const diffHours = (due - now) / (1000 * 60 * 60);
        const key = `${task.id}-${task.dueDate}`;

        // 24h reminder (window: 23.5–24.5h)
        if (diffHours <= 24 && diffHours > 23) {
          if (!sentReminders.current.has(key + '-24h')) {
            addNotification(`⏰ "${task.title}" is due in 24 hours.`, 'warning');
            sentReminders.current.add(key + '-24h');
          }
        }
        // 1h reminder (window: 0.5–1.5h)
        if (diffHours <= 1 && diffHours > 0.5) {
          if (!sentReminders.current.has(key + '-1h')) {
            addNotification(`⚠️ "${task.title}" is due in 1 hour!`, 'error');
            sentReminders.current.add(key + '-1h');
          }
        }
        // Overdue (only once)
        if (diffHours < 0 && !sentReminders.current.has(key + '-overdue')) {
          addNotification(`🚨 "${task.title}" is overdue!`, 'error');
          sentReminders.current.add(key + '-overdue');
        }
      });
    };

    // Initial check
    checkReminders();

    // Check every minute
    const interval = setInterval(checkReminders, 60000);

    return () => clearInterval(interval);
  }, [tasks, addNotification]);
}