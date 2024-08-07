import { IsEmail, IsOptional, IsString } from 'class-validator';

export class updateCodeVerification {
  @IsString()
  readonly codeVerification: string;
  @IsEmail()
  @IsOptional()
  readonly email?: string;
}
