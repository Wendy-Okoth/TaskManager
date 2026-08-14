import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Input from '../Input';

const TaskForm = ({ onClose, onSave, initialData }) => {
  const [error, setError] = useState('');
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  // Pre-fill form when editing
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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#FAFAF7] dark:bg-[#1C1C1A] rounded-lg shadow-xl max-w-md w-full p-6 border border-[#E5E4E1]">
        <h2 className="text-2xl font-medium mb-4 text-[#1C1C1A] dark:text-[#FAFAF7]">
          {initialData ? 'Edit Task' : 'Add New Task'}
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
            <label className="block text-sm font-medium text-[#5B6470] dark:text-[#9CA3AF] mb-1">
              Status
            </label>
            <select
              {...register('status')}
              className="w-full px-3 py-2 border border-[#E5E4E1] dark:border-[#2E303A] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3F6C51] bg-white dark:bg-[#1C1C1A] text-[#1C1C1A] dark:text-[#FAFAF7] font-mono text-sm"
            >
              <option value="To Do">● To Do</option>
              <option value="In Progress">◐ In Progress</option>
              <option value="Done">● Done</option>
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
              className="flex-1 py-2 px-4 bg-[#3F6C51] hover:bg-[#2F5A41] text-white font-medium rounded-md transition disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : initialData ? 'Update Task' : 'Add Task'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-[#E5E4E1] hover:bg-[#D5D4D1] dark:bg-[#2E303A] dark:hover:bg-[#3E404A] text-[#1C1C1A] dark:text-[#FAFAF7] font-medium rounded-md transition"
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