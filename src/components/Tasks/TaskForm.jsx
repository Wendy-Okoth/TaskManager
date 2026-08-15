import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Input from '../Input';

const TaskForm = ({ onClose, onSave, initialData }) => {
  const [error, setError] = useState('');
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description || '',
        status: initialData.status || 'To Do',
        dueDate: initialData.dueDate || '',
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    try {
      setError('');
      await onSave(data);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save task');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-ledger-pale rounded max-w-md w-full p-6">
        <h2 className="text-2xl font-medium text-ledger-text mb-4">
          {initialData ? 'edit task' : 'add task'}
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

          <Input
            label="Due Date"
            type="date"
            register={register('dueDate')}
            error={errors.dueDate}
          />

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 px-4 bg-ledger-indigo hover:bg-ledger-indigo/90 text-white font-medium rounded transition disabled:opacity-50"
            >
              {isSubmitting ? 'saving...' : initialData ? 'update' : 'add'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-ledger-pale hover:bg-ledger-pale rounded transition"
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;