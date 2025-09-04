import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmTodoRepository } from './repositories/typeorm-todo.repository';
import { TodoRepository } from './repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [
    {
      provide: TodoService,
      useFactory: (todoRepository: TodoRepository) => {
        return new TodoService(todoRepository);
      },
      inject: ['TODO_REPOSITORY'],
    },
    {
      provide: 'TODO_REPOSITORY',
      useClass: TypeOrmTodoRepository,
    },
  ],
  exports: [TodoService],
})
export class TodoModule {}
