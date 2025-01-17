import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'Juan Perez',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'juan@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Cellphone number of the user',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(14)
  cellphone: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password1234',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
