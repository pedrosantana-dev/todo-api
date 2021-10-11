import { UserLoginDto } from './../DTO/userLogin.dto';
import { RegisterUserDto } from './../DTO/registerUser.dto';
import { UserEntity } from './../entity/user.entity';
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>,
        private jwt: JwtService) {

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

    async loginUser(userLoginDTO: UserLoginDto) {
        const { username, password } = userLoginDTO;

        const user = await this.repo.findOne({ username });

        if (!user) {
            throw new UnauthorizedException('Usuário inválido');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            const jwtPayload = { username };
            const jwtToken = await this.jwt.signAsync(jwtPayload, { expiresIn: '1d', algorithm: 'HS512' });
            return { token: jwtToken };
        } else {
            throw new UnauthorizedException('Password inválido');
        }
    }

}
