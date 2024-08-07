import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { updateCodeVerification } from '../users/dto/code-verification.dto';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('register')
  async singUp(@Body() userDTO: CreateUserDto): Promise<void> {
    const user = await this.userService.create(userDTO);
    if (user) {
      return this.authService.assignAndSendCode(user.email);
    }
    return new Promise<void>(() => {});
  }

  @Post('activate')
  async activate(
    @Body() codeDTO: updateCodeVerification,
  ): Promise<User | void> {
    return this.authService.activateUserWithCode(codeDTO);
  }
}
