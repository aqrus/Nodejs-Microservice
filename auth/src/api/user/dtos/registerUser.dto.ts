import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class RegisterDto{

  @IsNotEmpty()
  public firt_name: string;
  @IsNotEmpty()
  public last_name: string;
  @IsNotEmpty()
  @IsEmail()
  public email: string;
  @IsNotEmpty()
  @MinLength(6,{message: 'Password is too short'})
  public password: string;

  constructor(firt_name: string, last_name: string, email: string, password: string){
    this.firt_name = firt_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
  }
}