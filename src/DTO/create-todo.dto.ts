import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateTodoDto {
    @IsNotEmpty()
    @MaxLength(15, {message: 'Tamanho máximo é 15 caracteres.'})
    title: string;
    @IsNotEmpty()
    description: string;
}