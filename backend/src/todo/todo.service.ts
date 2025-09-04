import { Inject, Injectable } from '@nestjs/common';
import { TodoRepository } from './repository.interface';
import { Todo } from './entities/todo.entity';
import { TodoStatus } from './types';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private readonly todoRepository: TodoRepository,
  ) {}

  async create(todoData: {
    title: string;
    description?: string;
  }): Promise<Todo> {
    return this.todoRepository.create({
      ...todoData,
      status: TodoStatus.PENDING,
    });
  }

  async findAll(status?: TodoStatus): Promise<Todo[]> {
    return this.todoRepository.findAll(status);
  }

  async findById(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) throw new Error(`Todo with ID ${id} not found`);
    return todo;
  }

  async update(
    id: string,
    data: { title?: string; description?: string; status?: TodoStatus },
  ): Promise<Todo> {
    return this.todoRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.todoRepository.delete(id);
  }
}
