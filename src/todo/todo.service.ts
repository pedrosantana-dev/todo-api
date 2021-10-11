import { UserEntity } from './../entity/user.entity';
import { CreateTodoDto } from './../DTO/create-todo.dto';
import { TodoEntity, TodoStatus } from 'src/entity/todo.entity';
import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {

    constructor(@InjectRepository(TodoEntity) private repo: Repository<TodoEntity>) {

    }

    async getAllTodos(user: UserEntity) {
        const query = await this.repo.createQueryBuilder('todos');
        query.where('todos.userId = :userId', { userId: user.id });

        try {
            return await query.getMany();
        } catch (error) {
            throw new NotFoundException('Nenhuma tarefa encontrada');
        }
    }

    async createTodo(createTodoDto: CreateTodoDto, user: UserEntity) {
        const todo = new TodoEntity();
        const { title, description } = createTodoDto;
        todo.title = title;
        todo.description = description;
        todo.status = TodoStatus.OPEN;
        todo.userId = user.id;

        this.repo.create(todo);
        try {
            return await this.repo.save(todo);
        } catch (err) {
            throw new InternalServerErrorException('Algo deu errado, tarefa não criada');
        }
    }

    async update(id: number, status: TodoStatus, user: UserEntity) {
        try {
            await this.repo.update({ id, userId: user.id }, { status });
            return this.repo.findOne({ id, userId: user.id });
        } catch (error) {
            throw new InternalServerErrorException('Algo deu errado');
        }
    }

    async delete(id: number, user: UserEntity) {
        const result = await this.repo.delete({ id, userId: user.id });

        if (result.affected === 0) {
            throw new NotFoundException('Tarefa não excluída')
        } else {
            return { success: true };
        }
    }

}
