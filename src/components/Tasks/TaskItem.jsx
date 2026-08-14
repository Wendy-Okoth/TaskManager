import { useState } from 'react';
import TaskForm from './TaskForm';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const statusColor = {
    'To Do': 'bg-[#5B6470]',
    'In Progress': 'bg-[#C97A2B]',
    'Done': 'bg-[#3F6C51]',
  };

  const statusDot = statusColor[task.status] || 'bg-[#5B6470]';

  const handleToggleComplete = () => {
    const newStatus = task.status === 'Done' ? 'To Do' : 'Done';
    onUpdate(task.id, { status: newStatus });
  };

  return (
    <>
      <div className="bg-white dark:bg-[#1C1C1A] p-4 rounded-lg border border-[#E5E4E1] dark:border-[#2E303A] hover:shadow-sm transition">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Title with status dot */}
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-block w-2 h-2 rounded-full ${statusDot}`} />
              <h3 className={`text-base font-medium ${task.status === 'Done' ? 'line-through text-[#5B6470]' : 'text-[#1C1C1A] dark:text-[#FAFAF7]'}`}>
                {task.title}
              </h3>
            </div>

            {/* Description */}
            {task.description && (
              <p className="text-sm text-[#5B6470] dark:text-[#9CA3AF] mt-1 ml-4">
                {task.description}
              </p>
            )}

            {/* Metadata - using monospace font */}
            <div className="flex flex-wrap items-center gap-3 mt-2 ml-4 font-mono text-xs text-[#5B6470] dark:text-[#9CA3AF]">
              <span>Status: {task.status}</span>
              {task.dueDate && (
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              )}
              <span className="text-[#5B6470]/50">·</span>
              <span className="text-[#5B6470]/50">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={handleToggleComplete}
              className="p-1.5 rounded hover:bg-[#E5E4E1] dark:hover:bg-[#2E303A] transition text-[#5B6470]"
              title={task.status === 'Done' ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {task.status === 'Done' ? '↩' : '✓'}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 rounded hover:bg-[#E5E4E1] dark:hover:bg-[#2E303A] transition text-[#5B6470]"
              title="Edit task"
            >
              ✎
            </button>
            <button
              onClick={() => {
                if (confirm('Delete this task?')) onDelete(task.id);
              }}
              className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition text-[#5B6470] hover:text-red-600"
              title="Delete task"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <TaskForm
          initialData={task}
          onClose={() => setIsEditing(false)}
          onSave={(updates) => onUpdate(task.id, updates)}
        />
      )}
    </>
  );
};

export default TaskItem;