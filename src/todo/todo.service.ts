import { CreateTodoDto } from './../DTO/create-todo.dto';
import { TodoEntity, TodoStatus } from 'src/entity/todo.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {

    constructor(@InjectRepository(TodoEntity) private repo: Repository<TodoEntity>) {

    }

    async getAllTodos() {
        return await this.repo.find();
    }

    async createTodo(createTodoDto: CreateTodoDto) {
        const todo = new TodoEntity();
        const { title, description } = createTodoDto;
        todo.title = title;
        todo.description = description;
        todo.status = TodoStatus.OPEN;

        this.repo.create(todo);
        try {
            return await this.repo.save(todo);
        } catch (err) {
            throw new InternalServerErrorException('Algo deu errado, tarefa não criada');
        }
    }

    async update(id: number, status: TodoStatus) {
        try {
            await this.repo.update({ id }, { status });
            return await this.repo.findOne({ id });
        } catch (error) {
            throw new InternalServerErrorException('Algo deu errado');
        }
    }

    async delete(id: number) {
        try {
            return await this.repo.delete({ id });
        } catch (error) {
            throw new InternalServerErrorException('Algo deu errado');
        }
    }

}
