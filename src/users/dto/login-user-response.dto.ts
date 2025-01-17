import { ApiProperty } from '@nestjs/swagger';

export class LoginUserResponseDto {
  @ApiProperty({
    description: 'HTTP code for login',
    example: 200,
  })
  status: number;

  @ApiProperty({
    description: 'User token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  token: string;

  @ApiProperty({
    description: 'Message',
    example: 'User logged in successfully',
  })
  message: string;

  constructor(status: number, token: string, message: string) {
    this.status = status;
    this.token = token;
    this.message = message;
  }
}
