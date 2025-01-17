import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterUserResponseDto } from './dto/register-user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async registerUser(
    registerUserDto: RegisterUserDto,
  ): Promise<RegisterUserResponseDto> {
    const { name, email, cellphone, password } = registerUserDto;

    const existingUserEmail = await this.userRepository.findOne({
      where: [{ email }],
    });
    if (existingUserEmail) {
      throw new Error('Email already in use');
    }
    const existingUserCellphone = await this.userRepository.findOne({
      where: [{ cellphone }],
    });
    if (existingUserCellphone) {
      throw new Error('Cellphone already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userRepository.create({
      name,
      email,
      cellphone,
      password: hashedPassword,
    });
    const result = await this.userRepository.save(newUser);
    return new RegisterUserResponseDto(
      201,
      {
        id: result.id,
        name: result.name,
        email: result.email,
        cellphone: result.cellphone,
      },
      'User registered successfully',
    );
  }
}
