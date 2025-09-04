'use client';

import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';
import { TodoStatus } from '../enums/todo-status.enum';
import api from '../lib/api';
import { FilterBar } from './FilterBar';

interface TodoListProps {
  todos: Todo[];
  onTodoChange: () => void;
}

export function TodoList({ todos, onTodoChange }: TodoListProps) {
  const [filter, setFilter] = useState<TodoStatus | ''>('');

  useEffect(() => {
    onTodoChange();
  }, [filter, onTodoChange]);

  const filteredTodos = filter ? todos.filter(todo => todo.status === filter) : todos;

  const handleUpdateStatus = async (id: string, currentStatus: TodoStatus) => {
    let newStatus: TodoStatus;
    
    switch(currentStatus) {
      case TodoStatus.PENDING:
        newStatus = TodoStatus.IN_PROGRESS;
        break;
      case TodoStatus.IN_PROGRESS:
        newStatus = TodoStatus.DONE;
        break;
      default:
        return; // No further action if already DONE
    }
    
    await api.put(`/todos/${id}`, { status: newStatus });
    onTodoChange();
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/todos/${id}`);
    onTodoChange();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Todos</h2>
      <FilterBar status={filter} onChange={setFilter} />
      {filteredTodos.length === 0 ? (
        <p className="text-gray-500">No todos found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{todo.title}</h3>
                {todo.description && (
                  <p className="text-sm text-gray-600">{todo.description}</p>
                )}
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    todo.status === 'PENDING'
                      ? 'bg-yellow-200'
                      : todo.status === 'IN_PROGRESS'
                      ? 'bg-blue-200'
                      : 'bg-green-200'
                  }`}
                >
                  {todo.status}
                </span>
              </div>
              <div className="space-x-2">
                {todo.status === 'PENDING' && (
                  <button
                    onClick={() => handleUpdateStatus(todo.id, todo.status)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Start
                  </button>
                )}
                {todo.status === 'IN_PROGRESS' && (
                  <button
                    onClick={() => handleUpdateStatus(todo.id, todo.status)}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Mark Done
                  </button>
                )}
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}