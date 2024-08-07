import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import environments from 'src/environments/environment';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailModule } from '../email/emails.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: environments.SECRECT_KEY,
      signOptions: { expiresIn: '300s' },
    }),
    EmailModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
