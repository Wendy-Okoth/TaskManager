import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../hooks/useTasks';
import TaskForm from '../components/Tasks/TaskForm';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { tasks, loading, error, addTask } = useTasks();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Task Manager</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {user?.email}
          </span>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Add Task button */}
      <button
        onClick={() => setShowForm(true)}
        className="mb-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition"
      >
        + Add Task
      </button>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading your tasks...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          <p>Error loading tasks: {error}</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && tasks.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 text-lg">No tasks yet. Click "Add Task" to create your first one!</p>
        </div>
      )}

      {/* Task list */}
      {!loading && !error && tasks.length > 0 && (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {task.title}
              </h3>
              {task.description && (
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  {task.description}
                </p>
              )}
              <div className="flex items-center gap-3 mt-2 text-sm">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {task.status || 'To Do'}
                </span>
                {task.dueDate && (
                  <span className="text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          onClose={() => setShowForm(false)}
          onSave={addTask}
        />
      )}
    </div>
  );
};

export default Dashboard;