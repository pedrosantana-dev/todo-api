import { UserEntity } from './../entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'LoemxnlfeoLjewSldoOpdhfie15456',
      signOptions: {
        algorithm: 'HS512',
        expiresIn: '1d'
      }
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
