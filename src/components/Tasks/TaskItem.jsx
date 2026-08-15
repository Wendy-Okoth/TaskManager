import { useState } from 'react';
import TaskForm from './TaskForm';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Done';
  const isDone = task.status === 'Done';

  const borderClass = isDone
    ? 'border-l-[3px] border-transparent'
    : isOverdue
    ? 'border-l-[3px] border-ledger-brick'
    : task.status === 'In Progress'
    ? 'border-l-[3px] border-ledger-indigo'
    : 'border-l-[3px] border-ledger-tinted';

  const textClass = isDone ? 'opacity-50 line-through' : '';

  const handleToggleComplete = () => {
    const newStatus = task.status === 'Done' ? 'To Do' : 'Done';
    onUpdate(task.id, { status: newStatus });
  };

  return (
    <>
      <div className={`pl-4 py-4 ${borderClass} hover:bg-ledger-pale/30 transition`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className={`text-base font-semibold text-ledger-text ${textClass}`}>
              {task.title}
            </h3>

            {task.description && (
              <p className={`text-sm text-ledger-tinted mt-0.5 ${textClass}`}>
                {task.description}
              </p>
            )}

            {/* Metadata: smaller, wider letter-spacing */}
            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-ledger-tinted tracking-wide">
              <span>status: {task.status}</span>
              {task.dueDate && (
                <span className={isOverdue && !isDone ? 'text-ledger-brick font-medium' : ''}>
                  due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
              <span className="text-ledger-tinted/40">·</span>
              <span className="text-ledger-tinted/40">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <button
              onClick={handleToggleComplete}
              className="p-1.5 rounded hover:bg-ledger-pale transition text-ledger-tinted text-sm"
              title={isDone ? 'mark incomplete' : 'mark complete'}
            >
              {isDone ? '↩' : '✓'}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 rounded hover:bg-ledger-pale transition text-ledger-tinted text-sm"
              title="edit"
            >
              ✎
            </button>
            <button
              onClick={() => {
                if (window.confirm('Delete this task?')) onDelete(task.id);
              }}
              className="p-1.5 rounded hover:bg-red-50 hover:text-ledger-brick transition text-ledger-tinted text-sm"
              title="delete"
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