import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { TodoRepository as TodoRepoInterface } from '../repository.interface'; // Rename to avoid confusion
import { TodoStatus } from '../types';

@Injectable()
export class TypeOrmTodoRepository implements TodoRepoInterface {
  constructor(
    @InjectRepository(Todo)
    private readonly todo: Repository<Todo>,
  ) {}

  async create(todo: Partial<Todo>): Promise<Todo> {
    const newTodo = this.todo.create(todo);
    return this.todo.save(newTodo);
  }

  async findAll(status?: TodoStatus): Promise<Todo[]> {
    const where = status ? { status } : {};
    return this.todo.find({ where });
  }

  async findById(id: string): Promise<Todo | null> {
    return this.todo.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<Todo>): Promise<Todo> {
    await this.todo.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.todo.delete(id);
  }
}
