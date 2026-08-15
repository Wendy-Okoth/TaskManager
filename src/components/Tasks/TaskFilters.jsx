/**
 * TaskFilters component - provides filtering by status and sorting options
 * Props:
 * - filterStatus: current filter value ('all', 'To Do', 'In Progress', 'Done')
 * - setFilterStatus: function to update filter
 * - sortBy: current sort field ('dueDate', 'createdAt', 'title')
 * - setSortBy: function to update sort field
 * - sortOrder: current sort order ('asc', 'desc')
 * - setSortOrder: function to update sort order
 */
const TaskFilters = ({
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  const statusOptions = ['All', 'To Do', 'In Progress', 'Done'];
  const sortOptions = [
    { value: 'dueDate', label: 'Due Date' },
    { value: 'createdAt', label: 'Created Date' },
    { value: 'title', label: 'Title' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6 p-4 border border-ledger-pale bg-ledger-card rounded">
      {/* Filter by status */}
      <div className="flex-1">
        <label className="block text-xs font-medium text-ledger-tinted mb-1">
          Filter by Status
        </label>
        <div className="flex flex-wrap gap-1.5">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 text-xs rounded transition ${
                filterStatus === status
                  ? 'bg-ledger-indigo text-white'
                  : 'border border-ledger-pale hover:bg-ledger-pale text-ledger-text'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Sort by */}
      <div className="flex-1 sm:max-w-xs">
        <label className="block text-xs font-medium text-ledger-tinted mb-1">
          Sort by
        </label>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 px-3 py-1 text-sm border border-ledger-pale rounded focus:outline-none focus:ring-2 focus:ring-ledger-indigo/30 bg-white text-ledger-text"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-1 border border-ledger-pale rounded hover:bg-ledger-pale transition text-sm text-ledger-tinted"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;