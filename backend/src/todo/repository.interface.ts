import { Todo } from './entities/todo.entity';
import { TodoStatus } from './types';

export interface TodoRepository {
  create(todo: Partial<Todo>): Promise<Todo>;
  findAll(userId: string, status?: TodoStatus): Promise<Todo[]>;
  findById(id: string, userId: string): Promise<Todo | null>;
  update(id: string, data: Partial<Todo>, userId: string): Promise<Todo>;
  delete(id: string, userId: string): Promise<void>;
}
