import { CheckSquare } from 'lucide-react';
import NotificationBell from './NotificationBell';

/**
 * Navigation Bar Component
 * Displays brand logo, user navigation (Welcome / Tasks), and authentication controls.
 * When logged in, shows user's display name, notification bell, and a red sign-out button.
 */
const Navbar = ({ user, onLogin, onSignup, onLogout, currentPage, setPage }) => {
  return (
    <nav className="border-b border-ledger-pale bg-ledger-bg/90 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand identity with logo */}
        <div className="flex items-center gap-3">
          <CheckSquare size={24} className="text-ledger-indigo" strokeWidth={1.5} />
          <span className="text-xl font-medium text-ledger-indigo tracking-tight">Ledger Blue</span>
          <span className="text-sm text-ledger-tinted font-light tracking-wide hidden sm:block">
            · Task Manager
          </span>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-ledger-tinted hidden sm:block">
                {user.displayName || user.email}
              </span>
              <button
                onClick={() => setPage('welcome')}
                className={`px-3 py-1.5 text-sm rounded transition ${
                  currentPage === 'welcome'
                    ? 'bg-ledger-indigo text-white'
                    : 'text-ledger-text hover:bg-ledger-pale'
                }`}
              >
                Welcome
              </button>
              <button
                onClick={() => setPage('tasks')}
                className={`px-3 py-1.5 text-sm rounded transition ${
                  currentPage === 'tasks'
                    ? 'bg-ledger-indigo text-white'
                    : 'text-ledger-text hover:bg-ledger-pale'
                }`}
              >
                Tasks
              </button>
              {/* Notification Bell */}
              <NotificationBell />
              <button
                onClick={onLogout}
                className="px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onLogin}
                className="px-3 py-1.5 text-sm text-ledger-text hover:bg-ledger-pale rounded transition"
              >
                Sign In
              </button>
              <button
                onClick={onSignup}
                className="px-3 py-1.5 text-sm bg-ledger-indigo hover:bg-ledger-indigo/90 text-white rounded transition"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;