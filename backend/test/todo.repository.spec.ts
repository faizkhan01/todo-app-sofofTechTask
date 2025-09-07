import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTodoRepository } from '../src/todo/repositories/typeorm-todo.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from '../src/todo/entities/todo.entity';
import { Repository } from 'typeorm';
import { TodoStatus } from '../src/todo/types';

describe('TypeOrmTodoRepository', () => {
  let repository: TypeOrmTodoRepository;
  let todoRepo: Repository<Todo>;

  const mockTodo = {
    id: 'uuid-123',
    title: 'Test Todo',
    status: 'PENDING' as TodoStatus,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTodo2 = {
    id: 'uuid-456',
    title: 'Test Todo 2',
    status: 'COMPLETED' as TodoStatus,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTodoRepository = {
    create: jest.fn().mockReturnValue(mockTodo),
    save: jest.fn().mockResolvedValue(mockTodo),
    find: jest.fn().mockResolvedValue([mockTodo, mockTodo2]),
    findOne: jest.fn().mockResolvedValue(mockTodo),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmTodoRepository,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockTodoRepository,
        },
      ],
    }).compile();

    repository = module.get<TypeOrmTodoRepository>(TypeOrmTodoRepository);
    todoRepo = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const todoData = { title: 'Test Todo' };
      const result = await repository.create(todoData);


      expect(todoRepo.create).toHaveBeenCalledWith(todoData);
      expect(todoRepo.save).toHaveBeenCalledWith(mockTodo);
      expect(result).toEqual(mockTodo);
    });
  });

  describe('findAll', () => {
    it('should return all todos when no status is provided', async () => {
      const userId = 'user-123';
      const result = await repository.findAll(userId);

      expect(todoRepo.find).toHaveBeenCalledWith({ where: { userId } });
      expect(result).toEqual([mockTodo, mockTodo2]);
    });

    it('should return filtered todos when status is provided', async () => {
      const userId = 'user-123';
      const status = 'PENDING' as TodoStatus;
      const result = await repository.findAll(userId, status);

      expect(todoRepo.find).toHaveBeenCalledWith({ where: { userId, status } });
      expect(result).toHaveLength(2);
    });
  });

  describe('findById', () => {
    it('should return a todo by id', async () => {
      const todoId = 'uuid-123';
      const userId = 'user-123';
      const result = await repository.findById(todoId, userId);

      expect(todoRepo.findOne).toHaveBeenCalledWith({ where: { id: todoId, userId } });
      expect(result).toEqual(mockTodo);
    });

    it('should return null when todo is not found', async () => {
      mockTodoRepository.findOne.mockResolvedValueOnce(null);

      const result = await repository.findById('non-existent-id', 'user-123');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const todoId = 'uuid-123';
      const userId = 'user-123';
      const updateData = { title: 'Updated Todo' };
      const updatedTodo = { ...mockTodo, ...updateData };


      mockTodoRepository.findOne.mockResolvedValueOnce(updatedTodo);

      const result = await repository.update(todoId, updateData, userId);

      expect(todoRepo.update).toHaveBeenCalledWith({ id: todoId, userId }, updateData);
      expect(todoRepo.findOne).toHaveBeenCalledWith({ where: { id: todoId, userId } });
      expect(result).toEqual(updatedTodo);
    });
  });

  describe('delete', () => {
    it('should delete a todo', async () => {
      const todoId = 'uuid-123';
      const userId = 'user-123';

      await expect(repository.delete(todoId, userId)).resolves.not.toThrow();
      expect(todoRepo.delete).toHaveBeenCalledWith({ id: todoId, userId });
    });
  });
});
