import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { generate } from 'otp-generator';
import { UsersAPIErrors } from 'src/utils/dictMessages';
import { User } from '../users/user.entity';
import { EmailService } from '../email/emails.service';
import { updateCodeVerification } from '../users/dto/code-verification.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneBy([{ email }], true);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private createCodeVerification() {
    const otp = generate(6, {
      specialChars: false,
    });
    return otp;
  }

  async assignAndSendCode(email: string) {
    const code = this.createCodeVerification();
    const user = await this.usersService.findOneBy([{ email }]);
    if (!user) throw new NotFoundException(UsersAPIErrors['notFoundEmail']);

    this.usersService
      .update(user.id, { codeVerification: code })
      .then(async (res: User) => {
        await this.emailService.sendEmail(res.email, '', { code });
      });
  }

  async activateUserWithCode({
    codeVerification,
    email,
  }: updateCodeVerification): Promise<User | void> {
    const user = await this.usersService.findOneBy([{ email }], true);
    if (!user) throw new NotFoundException(UsersAPIErrors['notFoundEmail']);

    if (user.codeVerification == codeVerification)
      return this.usersService.update(user.id, { isActive: true });
    else {
      throw new HttpException(UsersAPIErrors.codeNotPair, 400);
    }
  }

  //TODO: Logout?
}
