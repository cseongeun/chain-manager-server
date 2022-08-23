import { User } from '../user/user.entity';

export interface IUserSignIn extends User {
  accessToken: string;
}
