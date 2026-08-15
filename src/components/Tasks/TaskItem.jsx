import { useState } from 'react';
import TaskForm from './TaskForm';

/**
 * TaskItem component - displays a single task with color-coded status
 * - Status colors: Red (To Do), Amber (In Progress), Green (Done)
 * - Left border is ALWAYS visible based on status (never transparent)
 * - Overdue tasks show brick red border and text
 * - Complete toggle moves between To Do and Done
 */
const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Check if task is overdue (due date passed and not done)
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Done';
  const isDone = task.status === 'Done';

  // Status color mapping
  const statusColors = {
    'To Do': {
      border: 'border-ledger-todo',
      dot: 'bg-ledger-todo',
      text: 'text-ledger-todo',
      bg: 'bg-ledger-todo/10',
    },
    'In Progress': {
      border: 'border-ledger-progress',
      dot: 'bg-ledger-progress',
      text: 'text-ledger-progress',
      bg: 'bg-ledger-progress/10',
    },
    'Done': {
      border: 'border-ledger-done',
      dot: 'bg-ledger-done',
      text: 'text-ledger-done',
      bg: 'bg-ledger-done/10',
    },
  };

  // Get the status color object
  const statusStyle = statusColors[task.status] || statusColors['To Do'];

  // Determine border class (overdue overrides status, but NEVER transparent)
  const borderClass = isOverdue
    ? 'border-l-[3px] border-ledger-brick'
    : `border-l-[3px] ${statusStyle.border}`;

  // Text class for done tasks (fade and strikethrough, but border remains green)
  const textClass = isDone ? 'opacity-50 line-through' : '';

  /**
   * Toggle between To Do and Done status
   * In Progress status can be set via the edit modal
   */
  const handleToggleComplete = () => {
    const newStatus = task.status === 'Done' ? 'To Do' : 'Done';
    onUpdate(task.id, { status: newStatus });
  };

  // Format date with time
  const formatDateWithTime = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className={`pl-4 py-4 ${borderClass} hover:bg-ledger-pale/30 transition`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Title with status dot */}
            <div className="flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full ${statusStyle.dot}`} />
              <h3 className={`text-base font-semibold text-ledger-text ${textClass}`}>
                {task.title}
              </h3>
            </div>

            {/* Description */}
            {task.description && (
              <p className={`text-sm text-ledger-tinted mt-0.5 ml-4 ${textClass}`}>
                {task.description}
              </p>
            )}

            {/* Metadata: status, due date, created date */}
            <div className="flex flex-wrap items-center gap-3 mt-1.5 ml-4 text-xs tracking-wide">
              {/* Status tag with color */}
              <span className={`px-2 py-0.5 rounded ${statusStyle.bg} ${statusStyle.text} font-medium`}>
                {task.status}
              </span>

              {/* Due date with time and overdue styling */}
              {task.dueDate && (
                <span className={isOverdue && !isDone ? 'text-ledger-brick font-medium' : 'text-ledger-tinted'}>
                  Due: {formatDateWithTime(task.dueDate)}
                </span>
              )}

              <span className="text-ledger-tinted/40">·</span>
              <span className="text-ledger-tinted/40">
                Created: {formatDateWithTime(task.createdAt)}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <button
              onClick={handleToggleComplete}
              className={`p-1.5 rounded hover:bg-ledger-pale transition text-sm ${
                isDone ? 'text-ledger-done' : 'text-ledger-tinted'
              }`}
              title={isDone ? 'Mark Incomplete' : 'Mark Complete'}
            >
              {isDone ? '↩' : '✓'}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 rounded hover:bg-ledger-pale transition text-ledger-tinted text-sm"
              title="Edit Task"
            >
              ✎
            </button>
            <button
              onClick={() => {
                if (window.confirm('Delete this task?')) onDelete(task.id);
              }}
              className="p-1.5 rounded hover:bg-red-50 hover:text-ledger-brick transition text-ledger-tinted text-sm"
              title="Delete Task"
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