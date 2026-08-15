/**
 * Navigation Bar Component
 * Manages responsive top-level branding and user authentication state actions.
 */
const Navbar = ({ user, onLogin, onSignup, onLogout }) => {
  return (
    <nav className="border-b border-ledger-pale bg-ledger-bg/90 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand identity header */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-medium text-ledger-indigo tracking-tight">Ledger Blue</span>
          <span className="text-sm text-ledger-tinted font-light tracking-wide hidden sm:block">· Task Manager</span>
        </div>
        
        {/* Dynamic auth controls based on session state */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Display signed-in user identifier on larger screens */}
              <span className="text-sm text-ledger-tinted hidden sm:block">
                {user.email}
              </span>
              <button
                onClick={onLogout}
                className="px-3 py-1.5 text-sm border border-ledger-tinted text-ledger-text hover:bg-ledger-pale rounded transition"
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