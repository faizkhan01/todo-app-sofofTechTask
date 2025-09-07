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
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TodoService } from './todo.service';
import { TodoStatus } from './types';

@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() body: { title: string; description?: string }, @Request() req) {
    return this.todoService.create({
      ...body,
      userId: req.user.userId,
    });
  }

  @Get()
  findAll(@Request() req, @Query('status') status?: TodoStatus) {
    return this.todoService.findAll(req.user.userId, status);
  }

  @Get(':id')
  findById(@Param('id') id: string, @Request() req) {
    return this.todoService.findById(id, req.user.userId);
    
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { title?: string; description?: string; status?: TodoStatus },
    @Request() req,
  ) {
    return this.todoService.update(id, body, req.user.userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req) {
    return this.todoService.delete(id, req.user.userId);
  }
}
