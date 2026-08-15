import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import Input from '../Input';

/**
 * Login Component
 * Handles user authentication via email/password with validation and error management.
 */
const Login = ({ onSwitch, onBack }) => {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  /** Submits credential data to Firebase auth context */
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
      <div className="bg-ledger-card border border-ledger-pale rounded max-w-md w-full p-6">
        <h2 className="text-2xl font-medium text-ledger-text mb-4 border-b-2 border-ledger-pale pb-2">
          Sign In
        </h2>

        {/* Global error alert box */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4 text-sm">
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
            className="w-full py-2 px-4 bg-ledger-indigo hover:bg-ledger-indigo/90 text-white font-medium rounded transition disabled:opacity-50"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Placeholder hook for password recovery */}
        <div className="mt-2 text-right">
          <button 
            onClick={() => alert('Password reset functionality coming soon.')}
            className="text-sm text-ledger-brick hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Navigation triggers for view switching */}
        <div className="mt-4 text-sm text-center">
          <button onClick={onSwitch} className="text-ledger-indigo hover:underline">
            Create Account
          </button>
        </div>
        <div className="mt-2 text-xs text-center">
          <button onClick={onBack} className="text-ledger-tinted hover:underline">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;