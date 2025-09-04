import { TodoStatus } from '../enums/todo-status.enum';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  createdAt?: string;
  updatedAt?: string;
}
