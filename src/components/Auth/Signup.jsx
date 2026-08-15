import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import Input from '../Input';
import { CheckSquare } from 'lucide-react';

/**
 * Signup Component
 * Manages new user registration with first/last name, strong password validation,
 * and confirmation matching. Upon successful signup, stores displayName in Firebase Auth.
 */
const Signup = ({ onSwitch, onBack }) => {
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  // Watch password field to dynamically validate confirmation matching
  const password = watch('password');

  /** Submits validated user credentials and profile data to Firebase Auth */
  const onSubmit = async (data) => {
    try {
      setError('');
      await signup(data.email, data.password, data.firstName, data.lastName);
    } catch (err) {
      setError(err.message || 'Failed to create account');
    }
  };

  // Complex regex enforcing strong password security standards
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return (
    <div className="min-h-screen bg-ledger-bg flex items-center justify-center p-4">
      <div className="bg-ledger-card border border-ledger-pale rounded-lg shadow-sm max-w-md w-full p-8">
        {/* Logo / Brand header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <CheckSquare size={28} className="text-ledger-indigo" strokeWidth={1.5} />
          <span className="text-xl font-medium text-ledger-indigo tracking-tight">Ledger Blue</span>
        </div>

        <h2 className="text-2xl font-medium text-ledger-text mb-6 text-center">
          Create Your Account
        </h2>

        {/* Global error alert box */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name & Last Name side by side */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First Name"
              type="text"
              register={register('firstName', { required: 'First name is required' })}
              error={errors.firstName}
            />
            <Input
              label="Last Name"
              type="text"
              register={register('lastName', { required: 'Last name is required' })}
              error={errors.lastName}
            />
          </div>

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
            className="w-full py-2.5 px-4 bg-ledger-indigo hover:bg-ledger-indigo/90 text-white font-medium rounded transition disabled:opacity-50 mt-2"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Navigation triggers for view switching */}
        <div className="mt-6 pt-4 border-t border-ledger-pale text-sm text-center">
          <p className="text-ledger-tinted">
            Already have an account?{' '}
            <button onClick={onSwitch} className="text-ledger-indigo hover:underline font-medium">
              Sign In
            </button>
          </p>
        </div>
        <div className="mt-3 text-xs text-center">
          <button onClick={onBack} className="text-ledger-tinted hover:underline">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;