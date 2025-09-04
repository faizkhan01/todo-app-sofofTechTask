import { IsString, MinLength, IsNotEmpty, IsAlphanumeric } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
