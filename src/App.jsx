import { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import WelcomePage from './pages/WelcomePage';
import TasksPage from './pages/TasksPage';
import Home from './pages/Home';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

/**
 * Main Application Routing & State Controller
 * Evaluates authentication session state and view routing modes.
 * When user signs out, resets authMode to null to show the home page.
 */
function App() {
  const { user, loading, logout } = useAuth();
  const [authMode, setAuthMode] = useState(null); // null: home, 'login', 'signup'
  const [page, setPage] = useState('welcome');   // 'welcome' or 'tasks'

  // Reset authMode when user signs out → return to home page
  useEffect(() => {
    if (!user) {
      setAuthMode(null);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-ledger-bg">
        <div className="text-ledger-tinted text-sm">loading...</div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen flex flex-col bg-ledger-bg">
        <Navbar
          user={user}
          // onLogout={logout} // ❌ removed – Navbar doesn't need it
          currentPage={page}
          setPage={setPage}
        />
        <main className="flex-1">
          {page === 'welcome' ? <WelcomePage /> : <TasksPage />}
        </main>
        <Footer />
      </div>
    );
  }

  if (authMode === 'login') {
    return <Login onSwitch={() => setAuthMode('signup')} onBack={() => setAuthMode(null)} />;
  }
  if (authMode === 'signup') {
    return <Signup onSwitch={() => setAuthMode('login')} onBack={() => setAuthMode(null)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-ledger-bg">
      <Navbar
        user={user}
        onLogin={() => setAuthMode('login')}
        onSignup={() => setAuthMode('signup')}
        onLogout={logout}
      />
      <Home onLogin={() => setAuthMode('login')} onSignup={() => setAuthMode('signup')} />
      <Footer />
    </div>
  );
}

export default App;