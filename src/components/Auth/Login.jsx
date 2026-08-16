import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import Input from '../Input';
import { CheckSquare } from 'lucide-react';
import ForgotPasswordModal from './ForgotPasswordModal'; // ✅ new component

/**
 * Login Component
 * Handles user authentication via email/password with validation and error management.
 */
const Login = ({ onSwitch, onBack }) => {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      setError('');
      await login(data.email, data.password);
    } catch (err) {
      setError(err.message || 'Failed to log in');
    }
  };

  return (
    <div className="min-h-screen bg-ledger-bg flex items-center justify-center p-4">
      <div className="bg-ledger-card border border-ledger-pale rounded-lg shadow-sm max-w-md w-full p-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <CheckSquare size={28} className="text-ledger-indigo" strokeWidth={1.5} />
          <span className="text-xl font-medium text-ledger-indigo tracking-tight">Ledger Blue</span>
        </div>

        <h2 className="text-2xl font-medium text-ledger-text mb-6 text-center">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            register={register('email', { required: 'Email is required' })}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            register={register('password', { required: 'Password is required' })}
            error={errors.password}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 bg-ledger-indigo hover:bg-ledger-indigo/90 text-white font-medium rounded transition disabled:opacity-50 mt-2"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Forgot Password trigger */}
        <div className="mt-3 text-right">
          <button
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-ledger-brick hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-ledger-pale text-sm text-center">
          <p className="text-ledger-tinted">
            Don't have an account?{' '}
            <button onClick={onSwitch} className="text-ledger-indigo hover:underline font-medium">
              Create Account
            </button>
          </p>
        </div>
        <div className="mt-3 text-xs text-center">
          <button onClick={onBack} className="text-ledger-tinted hover:underline">
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
};

export default Login;