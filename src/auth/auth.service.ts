import { RegisterUserDto } from './../DTO/registerUser.dto';
import { UserEntity } from './../entity/user.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {

    }

    async registerUser(registerDTO: RegisterUserDto) {
        const { username, password } = registerDTO;
        const hashed = await bcrypt.hash(password, 12);
        const salt = await bcrypt.getSalt(hashed);

        const user: UserEntity = new UserEntity();
        user.username = username;
        user.password = hashed;
        user.salt = salt;

        this.repo.create(user);
        
        try {
            return await this.repo.save(user);
        } catch (error) {
            throw new InternalServerErrorException('Algo deu errado, usuário não criado')
        }
    }

}
