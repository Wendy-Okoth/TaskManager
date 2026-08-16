import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Forgot Password Modal
 * Allows users to request a password reset email.
 * Includes a spam folder reminder to help users locate the email.
 */
const ForgotPasswordModal = ({ onClose }) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await resetPassword(email);
      setMessage('Password reset email sent! Check your inbox (and spam folder).');
      setTimeout(onClose, 4000);
    } catch (err) {
      setError(err.message || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-ledger-card border border-ledger-pale rounded max-w-md w-full p-6">
        <h2 className="text-xl font-medium text-ledger-text mb-4 border-b-2 border-ledger-pale pb-2">
          Reset Password
        </h2>
        <p className="text-sm text-ledger-tinted mb-4">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded mb-4 text-sm">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-ledger-tinted mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-ledger-pale rounded focus:outline-none focus:ring-2 focus:ring-ledger-indigo/30 focus:border-ledger-indigo bg-white text-ledger-text"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 px-4 bg-ledger-indigo hover:bg-ledger-indigo/90 text-white font-medium rounded transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Email'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-ledger-pale hover:bg-ledger-pale rounded transition"
            >
              Cancel
            </button>
          </div>
        </form>

        <p className="mt-4 text-xs text-ledger-tinted text-center">
          If you don't see the email, please check your spam or junk folder.
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;