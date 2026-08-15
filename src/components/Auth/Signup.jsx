import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import Input from '../Input';

/**
 * Signup Component
 * Manages new user registration with client-side password strength validation 
 * and confirmation matching before calling Firebase authentication.
 */
const Signup = ({ onSwitch, onBack }) => {
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  
  // Watch password field to dynamically validate confirmation matching
  const password = watch('password');

  /** Submits validated user credentials to Firebase Auth */
  const onSubmit = async (data) => {
    try {
      setError('');
      await signup(data.email, data.password);
    } catch (err) {
      setError(err.message || 'Failed to create account');
    }
  };

  // Complex regex enforcing strong password security standards
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return (
    <div className="min-h-screen bg-ledger-bg flex items-center justify-center p-4">
      <div className="bg-ledger-card border border-ledger-pale rounded max-w-md w-full p-6">
        <h2 className="text-2xl font-medium text-ledger-text mb-4 border-b-2 border-ledger-pale pb-2">
          Create Account
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
          <div className="mb-4">
            <Input
              label="Password"
              type="password"
              register={register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Must be at least 8 characters' },
                pattern: {
                  value: passwordPattern,
                  message: 'Must include uppercase, lowercase, number, and special character'
                }
              })}
              error={errors.password}
            />
            {/* Helper guidance for password requirements */}
            <p className="mt-1 text-xs text-ledger-tinted">
              (min 8 chars · upper/lower · number · special)
            </p>
          </div>
          <Input
            label="Confirm Password"
            type="password"
            register={register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
            error={errors.confirmPassword}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-ledger-indigo hover:bg-ledger-indigo/90 text-white font-medium rounded transition disabled:opacity-50"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Navigation triggers for view switching */}
        <div className="mt-4 text-sm text-center">
          <button onClick={onSwitch} className="text-ledger-indigo hover:underline">
            Already Have an Account? Sign In
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

export default Signup;