import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../hooks/useTasks';
import { CheckSquare, Clock, AlertCircle, CheckCircle } from 'lucide-react';

/**
 * Welcome Page – Personalised dashboard showing task statistics.
 * Displays a greeting with the user's first name, and counts for total,
 * completed, overdue, and in-progress tasks.
 */
const WelcomePage = () => {
  const { user } = useAuth();
  const { tasks } = useTasks();

  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'Done').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const todo = tasks.filter(t => t.status === 'To Do').length;
  const overdue = tasks.filter(
    t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'Done'
  ).length;

  // Extract first name from displayName or fallback to "User"
  const firstName = user?.displayName?.split(' ')[0] || 'User';

  // Calculate completion percentage
  const completionRate = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-ledger-text mb-1">
          Welcome back, {firstName}! 👋
        </h1>
        <p className="text-ledger-tinted">
          Here's a quick overview of your tasks.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-ledger-card border border-ledger-pale p-4 rounded">
          <div className="flex items-center gap-2 mb-1">
            <CheckSquare size={16} className="text-ledger-indigo" />
            <div className="text-2xl font-semibold text-ledger-indigo">{total}</div>
          </div>
          <div className="text-xs text-ledger-tinted">Total Tasks</div>
        </div>
        <div className="bg-ledger-card border border-ledger-pale p-4 rounded">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle size={16} className="text-ledger-done" />
            <div className="text-2xl font-semibold text-ledger-done">{done}</div>
          </div>
          <div className="text-xs text-ledger-tinted">Completed</div>
        </div>
        <div className="bg-ledger-card border border-ledger-pale p-4 rounded">
          <div className="flex items-center gap-2 mb-1">
            <Clock size={16} className="text-ledger-progress" />
            <div className="text-2xl font-semibold text-ledger-progress">{inProgress}</div>
          </div>
          <div className="text-xs text-ledger-tinted">In Progress</div>
        </div>
        <div className="bg-ledger-card border border-ledger-pale p-4 rounded">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle size={16} className="text-ledger-brick" />
            <div className="text-2xl font-semibold text-ledger-brick">{overdue}</div>
          </div>
          <div className="text-xs text-ledger-tinted">Overdue</div>
        </div>
      </div>

      {/* Completion progress bar */}
      <div className="bg-ledger-card border border-ledger-pale p-4 rounded mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-ledger-text">Completion Progress</span>
          <span className="text-sm text-ledger-tinted">{completionRate}%</span>
        </div>
        <div className="w-full h-2 bg-ledger-pale rounded-full overflow-hidden">
          <div
            className="h-full bg-ledger-indigo rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-ledger-tinted">
          <span>{todo} remaining</span>
          <span>{total - done} tasks to go</span>
        </div>
      </div>

      {/* Quick tip if no tasks */}
      {total === 0 && (
        <div className="text-center py-8 border border-ledger-pale bg-ledger-card rounded">
          <p className="text-ledger-tinted text-sm">
            You don't have any tasks yet. Head to <span className="text-ledger-indigo font-medium">Tasks</span> to get started!
          </p>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;