import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../hooks/useTasks';
import { useNotifications } from '../contexts/NotificationContext';
import { useDueDateReminders } from '../hooks/useDueDateReminders';
import TaskForm from '../components/Tasks/TaskForm';
import TaskItem from '../components/Tasks/TaskItem';
import TaskFilters from '../components/Tasks/TaskFilters';
import { ListChecks } from 'lucide-react';

/**
 * TasksPage – displays the user's tasks with filtering and sorting
 * Uses the useTasks hook for data and state management.
 * This page is rendered inside the App's main layout, so it does NOT include
 * its own Navbar or Footer (those are provided by App.jsx).
 */
const TasksPage = () => {
  const { user } = useAuth();
  const {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = useTasks();
  const { addNotification } = useNotifications();
  const [showForm, setShowForm] = useState(false);

  // Check due dates for reminders
  useDueDateReminders(tasks);

  // Wrap addTask with notification
  const handleAddTask = async (data) => {
    await addTask(data);
    addNotification(`Task "${data.title}" added successfully.`, 'success');
  };

  // Wrap updateTask with notification
  const handleUpdateTask = async (id, updates) => {
    const oldTask = tasks.find(t => t.id === id);
    await updateTask(id, updates);
    const newTitle = updates.title || oldTask?.title || 'Task';
    addNotification(`"${newTitle}" updated.`, 'info');
  };

  // Wrap deleteTask with notification
  const handleDeleteTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    await deleteTask(id);
    addNotification(`"${task?.title || 'Task'}" deleted.`, 'error');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header with icon and task count */}
      <div className="flex items-center gap-3 mb-6 border-b-2 border-ledger-pale pb-4">
        <ListChecks size={28} className="text-ledger-indigo" strokeWidth={1.5} />
        <div>
          <h2 className="text-xl font-medium text-ledger-text">Tasks</h2>
          <p className="text-xs text-ledger-tinted">
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <div className="ml-auto">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-1.5 bg-ledger-indigo hover:bg-ledger-indigo/90 text-white text-sm rounded transition"
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* Filter and Sort controls */}
      <TaskFilters
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* Loading state */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-ledger-tinted text-sm">Loading Tasks...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          Error: {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && tasks.length === 0 && (
        <div className="text-center py-16 border border-ledger-pale bg-ledger-card rounded">
          <p className="text-ledger-tinted text-sm">
            {filterStatus !== 'All'
              ? `No tasks with status "${filterStatus}". Try a different filter.`
              : 'No Tasks Yet. Add One Above.'}
          </p>
        </div>
      )}

      {/* Task list */}
      {!loading && !error && tasks.length > 0 && (
        <div className="divide-y divide-ledger-pale">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          onClose={() => setShowForm(false)}
          onSave={handleAddTask}
        />
      )}
    </div>
  );
};

export default TasksPage;