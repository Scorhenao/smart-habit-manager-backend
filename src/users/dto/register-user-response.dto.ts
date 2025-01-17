import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserResponseDto {
  @ApiProperty({
    description: 'HTTP code for registration',
    example: 201,
  })
  status: number;

  @ApiProperty({
    description: 'User data',
    example: {
      id: '12345',
      name: 'John Doe',
      email: 'johndoe@example.com',
      cellphone: '+1234567890',
    },
  })
  data: {
    id: string;
    name: string;
    email: string;
    cellphone: string;
  };

  @ApiProperty({
    description: 'Message',
    example: 'User registered successfully',
  })
  message: string;

  constructor(
    status: number,
    data: { id: string; name: string; email: string; cellphone: string },
    message: string,
  ) {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}
