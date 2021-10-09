import { TodoStatusValidationPipe } from './../pipes/TodoStatusValidationPipe.pipe';
import { TodoStatus } from './../entity/todo.entity';
import { CreateTodoDto } from './../DTO/create-todo.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';

// http://localhost:3000/api/todos
@Controller('todos')
export class TodoController {

    constructor(private todoService: TodoService) { }

    // http GET verb
    @Get()
    getAllTodos() {
        return this.todoService.getAllTodos();
    }


    @Post()
    createNewTodo(@Body(ValidationPipe) data: CreateTodoDto) {
        return this.todoService.createTodo(data);
    }

    @Patch(':id')
    updateTodo(@Body('status', TodoStatusValidationPipe) status: TodoStatus,
        @Param('id') id: number) {
        return this.todoService.update(id, status);
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: number) {
        return this.todoService.delete(id);
    }

}
