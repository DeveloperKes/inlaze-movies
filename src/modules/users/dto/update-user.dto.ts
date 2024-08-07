import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class updateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
