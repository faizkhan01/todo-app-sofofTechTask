import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TodoService } from './todo.service';
import { TodoStatus } from './types';

@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() body: { title: string; description?: string }) {
    return this.todoService.create(body);
  }

  @Get()
  findAll(@Query('status') status?: TodoStatus) {
    return this.todoService.findAll(status);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.todoService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { title?: string; description?: string; status?: TodoStatus },
  ) {
    return this.todoService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
