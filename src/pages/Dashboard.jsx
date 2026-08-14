import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../hooks/useTasks';
import TaskForm from '../components/Tasks/TaskForm';
import TaskItem from '../components/Tasks/TaskItem';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { tasks, loading, error, addTask, updateTask, deleteTask } = useTasks();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-4 max-w-3xl mx-auto bg-[#FAFAF7] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-[#E5E4E1] pb-4">
        <h1 className="text-2xl font-medium text-[#1C1C1A] tracking-tight">
          field notes
        </h1>
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-[#5B6470]">
            {user?.email}
          </span>
          <button
            onClick={logout}
            className="px-3 py-1.5 text-sm border border-[#E5E4E1] hover:bg-[#E5E4E1] dark:hover:bg-[#2E303A] rounded transition text-[#1C1C1A] dark:text-[#FAFAF7]"
          >
            sign out
          </button>
        </div>
      </div>

      {/* Add Task button */}
      <button
        onClick={() => setShowForm(true)}
        className="mb-6 px-4 py-2 bg-[#3F6C51] hover:bg-[#2F5A41] text-white font-medium rounded-md transition text-sm"
      >
        + add task
      </button>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-[#5B6470] font-mono text-sm">loading tasks...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          <p>error: {error}</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && tasks.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-[#1C1C1A] rounded-lg border border-[#E5E4E1] dark:border-[#2E303A]">
          <p className="text-[#5B6470] font-mono text-sm">
            no tasks yet. add one above.
          </p>
        </div>
      )}

      {/* Task list */}
      {!loading && !error && tasks.length > 0 && (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
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