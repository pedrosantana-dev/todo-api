import { RegisterUserDto } from './../DTO/registerUser.dto';
import { AuthService } from './auth.service';
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';


// http://localhost:3000/api/auth
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }


    @Post('register')
    registration(@Body(ValidationPipe) regDTO: RegisterUserDto) {
        return this.authService.registerUser(regDTO);
    }


}
