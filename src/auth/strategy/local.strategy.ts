import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthProvider } from '../../user/user.constant';

@Injectable()
export class ProviderAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    console.log('here');
    super();
  }

  async validate(
    provider: AuthProvider,
    username: string,
    password: string,
  ): Promise<any> {
    const user = await this.authService.validateUser(
      provider,
      username,
      password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
