import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../hooks/useTasks';
import TaskForm from '../components/Tasks/TaskForm';
import TaskItem from '../components/Tasks/TaskItem';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { tasks, loading, error, addTask, updateTask, deleteTask } = useTasks();
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

        {loading && (
          <div className="text-center py-8">
            <p className="text-ledger-tinted text-sm">Loading Tasks...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            Error: {error}
          </div>
        )}

        {!loading && !error && tasks.length === 0 && (
          <div className="text-center py-16 border border-ledger-pale bg-ledger-card rounded">
            <p className="text-ledger-tinted text-sm">No Tasks Yet. Add One Above.</p>
          </div>
        )}

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