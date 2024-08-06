import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseErrors, UsersAPIErrors } from 'src/utils/dictErrors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: {
        email: true,
        isActive: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      select: {
        email: true,
        isActive: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    try {
      return await this.usersRepository.save(newUser).then((res: User) => {
        delete res.password;
        return res;
      });
    } catch (error) {
      throw new HttpException(
        `${UsersAPIErrors[DatabaseErrors[error.code]].message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
