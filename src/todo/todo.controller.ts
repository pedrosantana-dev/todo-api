import { CreateTodoDto } from './../DTO/create-todo.dto';
import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
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

}
