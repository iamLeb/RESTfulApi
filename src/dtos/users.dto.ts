import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsPhoneNumber, IsNumber } from "class-validator";

export class CreateUserDto {
  @IsNumber()
  public phone: number;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}
