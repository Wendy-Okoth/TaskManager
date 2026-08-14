import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Input from '../Input';

const TaskForm = ({ onClose, onSave }) => {
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      status: 'To Do',
      dueDate: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setError('');
      await onSave(data);
      onClose(); // close modal on success
    } catch (err) {
      setError(err.message || 'Failed to add task');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Add New Task</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Title *"
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              {...register('status')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
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
              className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Add Task'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-md transition"
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