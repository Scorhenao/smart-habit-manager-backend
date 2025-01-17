import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterUserResponseDto } from './dto/register-user-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserResponseDto } from './dto/login-user-response.dto';
import { JwtStrategy } from 'src/common/auth/jwt.strategy';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtStrategy: JwtStrategy,
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
  async loginUser(loginUserDto: LoginUserDto): Promise<LoginUserResponseDto> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: [{ email }] });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = await this.jwtStrategy.generateToken(user.id);

    if (!token) {
      throw new Error('Failed to generate token');
    }

    return new LoginUserResponseDto(200, token, 'User logged in successfully');
  }
}
