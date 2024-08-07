import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseErrors, UsersAPIErrors } from 'src/utils/dictMessages';
import { updateCodeVerification } from './dto/code-verification.dto';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: {
        id: true,
        email: true,
        isActive: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  findOne(id: number, internal: boolean = false): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      select: {
        id: true,
        email: true,
        password: internal,
        isActive: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
  findOneBy(where: any[], internal: boolean = false): Promise<User> {
    return this.usersRepository.findOne({
      where,
      select: {
        id: true,
        email: true,
        isActive: true,
        password: internal,
        codeVerification: internal,
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
      console.log(error);
      throw new HttpException(
        `${UsersAPIErrors[DatabaseErrors[error.code]]?.message || 'Error catched'}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    updateData: updateCodeVerification | updateUserDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(UsersAPIErrors['notFound']);

    Object.assign(user, updateData);
    return this.usersRepository.save(user);
  }
}
