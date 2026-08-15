import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Input from '../Input';

/**
 * TaskForm Component
 * Reusable form for creating and editing tasks.
 * Supports title, description, status, and due date with time.
 * Prevents selecting past dates/times for due date via min attribute and validation.
 */
const TaskForm = ({ onClose, onSave, initialData }) => {
  const [error, setError] = useState('');
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    if (initialData) {
      // Format date for datetime-local input
      const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
      };

      reset({
        title: initialData.title,
        description: initialData.description || '',
        status: initialData.status || 'To Do',
        dueDate: formatDateForInput(initialData.dueDate),
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    try {
      setError('');

      // Check if due date is in the past (only for new tasks, or if user changed it)
      if (data.dueDate) {
        const selectedDate = new Date(data.dueDate);
        const now = new Date();
        if (selectedDate < now) {
          setError('Due date cannot be in the past. Please select a future date and time.');
          return;
        }
      }

      await onSave(data);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save task');
    }
  };

  // Get current datetime for min attribute
  const now = new Date();
  const minDateTime = now.toISOString().slice(0, 16);

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-ledger-card border border-ledger-pale rounded max-w-md w-full p-6">
        <h2 className="text-2xl font-medium text-ledger-text mb-4 border-b-2 border-ledger-pale pb-2">
          {initialData ? 'Edit Task' : 'Add Task'}
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Title"
            type="text"
            register={register('title', { required: 'Title is required' })}
            error={errors.title}
          />

          <Input
            label="Description"
            type="text"
            register={register('description')}
            error={errors.description}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-ledger-tinted mb-1">
              Status
            </label>
            <select
              {...register('status')}
              className="w-full px-3 py-2 border border-ledger-pale rounded focus:outline-none focus:ring-2 focus:ring-ledger-indigo/30 focus:border-ledger-indigo bg-white text-ledger-text"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-ledger-tinted mb-1">
              Due Date & Time
            </label>
            <input
              type="datetime-local"
              {...register('dueDate')}
              min={minDateTime}
              className="w-full px-3 py-2 border border-ledger-pale rounded focus:outline-none focus:ring-2 focus:ring-ledger-indigo/30 focus:border-ledger-indigo bg-white text-ledger-text"
            />
            <p className="mt-1 text-xs text-ledger-tinted">
              Select a future date and time for your task deadline.
            </p>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 px-4 bg-ledger-indigo hover:bg-ledger-indigo/90 text-white font-medium rounded transition disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Add'}
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
      </div>
    </div>
  );
};

export default TaskForm;