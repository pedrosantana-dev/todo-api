import { TodoEntity } from 'src/entity/todo.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {

    constructor(@InjectRepository(TodoEntity) private repo: Repository<TodoEntity>) {

    }

    async getAllTodos() {
        return await this.repo.find();
    }

}
