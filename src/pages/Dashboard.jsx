import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../hooks/useTasks';
import TaskForm from '../components/Tasks/TaskForm';
import TaskItem from '../components/Tasks/TaskItem';
import TaskFilters from '../components/Tasks/TaskFilters';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

/**
 * Dashboard page - displays the user's tasks with filtering and sorting
 * Uses the useTasks hook for data and state management
 */
const Dashboard = () => {
  const { user, logout } = useAuth();
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
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-ledger-bg">
      <Navbar user={user} onLogout={logout} />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <div className="flex justify-between items-center mb-6 border-b-2 border-ledger-pale pb-2">
          <h2 className="text-xl font-medium text-ledger-text">Tasks</h2>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-1.5 bg-ledger-indigo hover:bg-ledger-indigo/90 text-white text-sm rounded transition"
          >
            + Add Task
          </button>
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

        {/* Task count */}
        <div className="mb-3 text-xs text-ledger-tinted">
          Showing {tasks.length} task{tasks.length !== 1 ? 's' : ''}
        </div>

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
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;