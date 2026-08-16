import { useState } from 'react';
import { CheckSquare, Home, ListChecks, User } from 'lucide-react';
import NotificationBell from './NotificationBell';
import ProfileDropdown from './ProfileDropdown';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Navigation Bar Component
 * Now includes profile icon (clickable) that opens a dropdown with user info and edit option.
 * Welcome and Tasks buttons have icons. No standalone Sign Out button anymore.
 */
const Navbar = ({ user, onLogin, onSignup, currentPage, setPage }) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="border-b border-ledger-pale bg-ledger-bg/90 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand identity */}
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
              {/* Welcome button with icon */}
              <button
                onClick={() => setPage('welcome')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded transition ${
                  currentPage === 'welcome'
                    ? 'bg-ledger-indigo text-white'
                    : 'text-ledger-text hover:bg-ledger-pale'
                }`}
              >
                <Home size={16} strokeWidth={1.5} />
              </button>

              {/* Tasks button with icon */}
              <button
                onClick={() => setPage('tasks')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded transition ${
                  currentPage === 'tasks'
                    ? 'bg-ledger-indigo text-white'
                    : 'text-ledger-text hover:bg-ledger-pale'
                }`}
              >
                <ListChecks size={16} strokeWidth={1.5} />
              </button>

              <NotificationBell />

              {/* Profile icon with dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="p-1.5 rounded hover:bg-ledger-pale transition text-ledger-tinted"
                  aria-label="Profile"
                >
                  <User size={20} strokeWidth={1.5} />
                </button>
                {showProfile && (
                  <ProfileDropdown onClose={() => setShowProfile(false)} />
                )}
              </div>
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