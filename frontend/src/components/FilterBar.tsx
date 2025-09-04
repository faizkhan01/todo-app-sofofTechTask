'use client';

import { TodoStatus } from '../../../backend/src/todo/types';

interface FilterBarProps {
  status: TodoStatus | '';
  onChange: (status: TodoStatus | '') => void;
}

export function FilterBar({ status, onChange }: FilterBarProps) {
  return (
    <div className="mb-4">
      <label>Filter by Status: </label>
      <select
        value={status}
        onChange={(e) => onChange(e.target.value as TodoStatus | '')}
        className="border p-2 rounded"
      >
        <option value="">All</option>
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>
    </div>
  );
}