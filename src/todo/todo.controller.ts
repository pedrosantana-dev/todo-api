import { UserEntity } from './../entity/user.entity';
import { TodoStatusValidationPipe } from './../pipes/TodoStatusValidationPipe.pipe';
import { TodoStatus } from './../entity/todo.entity';
import { CreateTodoDto } from './../DTO/create-todo.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';

// http://localhost:3000/api/todos
@Controller('todos')
@UseGuards(AuthGuard())
export class TodoController {

    constructor(private todoService: TodoService) { }

    // http GET verb
    @Get()
    getAllTodos(
        @User() user: UserEntity
    ) {
        return this.todoService.getAllTodos(user);
    }


    @Post()
    createNewTodo(@Body(ValidationPipe) data: CreateTodoDto,
        @User() user: UserEntity) {
        return this.todoService.createTodo(data, user);
    }

    @Patch(':id')
    updateTodo(@Body('status', TodoStatusValidationPipe) status: TodoStatus,
        @Param('id') id: number,
        @User() user: UserEntity) {
        return this.todoService.update(id, status, user);
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: number,
        @User() user: UserEntity) {
        return this.todoService.delete(id, user);
    }

}
