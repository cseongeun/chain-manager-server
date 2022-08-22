import { IsEnum, IsString } from 'class-validator';
import { AuthProvider } from '../user/user.constant';
import { User } from '../user/user.entity';

export class SignInDTO {
  user: User;
}

export class SignUpDTO {
  @IsEnum(AuthProvider)
  provider: AuthProvider;

  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
