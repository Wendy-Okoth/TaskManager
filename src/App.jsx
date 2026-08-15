import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

function App() {
  const { user, loading, logout } = useAuth();
  const [authMode, setAuthMode] = useState(null); // null: home, 'login', 'signup'

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-ledger-bg">
        <div className="text-ledger-tinted text-sm">loading...</div>
      </div>
    );
  }

  if (user) {
    return <Dashboard />;
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