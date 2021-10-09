import { TodoStatus } from './../entity/todo.entity';
import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class TodoStatusValidationPipe implements PipeTransform {
    readonly allowedStatus: TodoStatus[] = [TodoStatus.OPEN, TodoStatus.WIP, TodoStatus.COMPLETED];


    transform(value: any, metadata: ArgumentMetadata): any {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} é um status inválido.`);
        }
        return value;
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatus.indexOf(status);

        return index !== -1;
    }

}