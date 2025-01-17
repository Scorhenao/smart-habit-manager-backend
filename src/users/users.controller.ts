import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterUserResponseDto } from './dto/register-user-response.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: RegisterUserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  registerUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<RegisterUserResponseDto> {
    return this.usersService.registerUser(registerUserDto);
  }
}
