import { useState, useRef, useEffect } from 'react';
import { User, Mail, Calendar, ListChecks, LogOut, Edit2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTasks } from '../../hooks/useTasks';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';

/**
 * ProfileDropdown – displays user info, stats, and accessibility controls.
 * Allows editing first/last name, and toggling font size & font family.
 */
const ProfileDropdown = ({ onClose }) => {
  const { user, logout } = useAuth();
  const { tasks } = useTasks();
  const { fontSize, setFontSize, fontFamily, setFontFamily } = useAccessibility();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dropdownRef = useRef(null);

  // Get user initials for avatar
  const getInitials = () => {
    if (!user?.displayName) return '?';
    const parts = user.displayName.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  // Pre-fill current name
  useEffect(() => {
    if (user?.displayName) {
      const parts = user.displayName.split(' ');
      setFirstName(parts[0] || '');
      setLastName(parts.slice(1).join(' ') || '');
    }
  }, [user]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSaveName = async () => {
    setError('');
    setSuccess('');
    const fullName = `${firstName} ${lastName}`.trim();
    if (!fullName) {
      setError('Name cannot be empty');
      return;
    }

    try {
      await updateProfile(auth.currentUser, {
        displayName: fullName,
      });
      setSuccess('Name updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError('Failed to update name');
      console.error(err);
    }
  };

  const creationDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : 'N/A';

  const lastLogin = user?.metadata?.lastSignInTime
    ? new Date(user.metadata.lastSignInTime).toLocaleString()
    : 'N/A';

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-72 bg-ledger-card border border-ledger-pale rounded shadow-lg z-50"
    >
      {/* Header with avatar */}
      <div className="p-4 border-b border-ledger-pale flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-ledger-indigo flex items-center justify-center text-white text-lg font-medium">
          {getInitials()}
        </div>
        <div className="flex-1 min-w-0">
          {isEditing ? (
            // Edit mode
            <div>
              <div className="flex gap-1">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-1/2 px-2 py-1 border border-ledger-pale rounded text-sm"
                  placeholder="First"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-1/2 px-2 py-1 border border-ledger-pale rounded text-sm"
                  placeholder="Last"
                />
              </div>
              {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
              {success && <p className="text-xs text-green-600 mt-1">{success}</p>}
              <div className="flex gap-2 mt-1">
                <button
                  onClick={handleSaveName}
                  className="px-2 py-0.5 text-xs bg-ledger-indigo text-white rounded hover:bg-ledger-indigo/90"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setError('');
                  }}
                  className="px-2 py-0.5 text-xs border border-ledger-pale rounded hover:bg-ledger-pale"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // View mode
            <>
              <div className="flex items-center justify-between">
                <span className="font-medium text-ledger-text text-sm truncate">
                  {user?.displayName || 'User'}
                </span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-0.5 rounded hover:bg-ledger-pale transition text-ledger-tinted flex-shrink-0"
                  title="Edit name"
                >
                  <Edit2 size={14} />
                </button>
              </div>
              <div className="flex items-center gap-1 text-xs text-ledger-tinted truncate">
                <Mail size={12} />
                <span className="truncate">{user?.email}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* User stats */}
      <div className="p-3 space-y-2 text-xs">
        <div className="flex items-center gap-2 text-ledger-tinted">
          <Calendar size={14} />
          <span>Joined: {creationDate}</span>
        </div>
        <div className="flex items-center gap-2 text-ledger-tinted">
          <ListChecks size={14} />
          <span>Total tasks: {tasks.length}</span>
        </div>
        <div className="flex items-center gap-2 text-ledger-tinted">
          <LogOut size={14} />
          <span>Last login: {lastLogin}</span>
        </div>
      </div>

      {/* ── Accessibility Controls ── */}
      <div className="p-3 border-t border-ledger-pale">
        <p className="text-xs text-ledger-tinted mb-2">Accessibility</p>
        <div className="flex items-center gap-2">
          {/* Font size buttons */}
          <div className="flex gap-1">
            {['small', 'medium', 'large'].map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`px-2 py-0.5 text-xs rounded border transition ${
                  fontSize === size
                    ? 'bg-ledger-indigo text-white border-ledger-indigo'
                    : 'border-ledger-pale hover:bg-ledger-pale'
                }`}
              >
                {size === 'small' ? 'A' : size === 'medium' ? 'A' : 'A'}
                {size === 'small' ? '↓' : size === 'medium' ? '−' : '↑'}
              </button>
            ))}
          </div>
          <span className="text-ledger-tinted/30">|</span>
          {/* Font family buttons */}
          <div className="flex gap-1">
            {['sans', 'serif', 'mono'].map((family) => (
              <button
                key={family}
                onClick={() => setFontFamily(family)}
                className={`px-2 py-0.5 text-xs rounded border transition ${
                  fontFamily === family
                    ? 'bg-ledger-indigo text-white border-ledger-indigo'
                    : 'border-ledger-pale hover:bg-ledger-pale'
                }`}
                style={{ fontFamily: family === 'sans' ? 'Inter, sans-serif' : family === 'serif' ? 'Georgia, serif' : 'monospace' }}
              >
                Aa
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sign out */}
      <div className="p-2 border-t border-ledger-pale">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;