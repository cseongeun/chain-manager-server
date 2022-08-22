import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ROUTE } from './auth.constant';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO } from './auth.dto';

@Controller(ROUTE.ROOT)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(ROUTE.SIGN_IN)
  async signin(@Request() req: SignInDTO) {
    console.log(req);
    const { user } = req;
    return this.authService.signin(user);
  }

  @Post(ROUTE.SIGN_UP)
  async signup(@Body() body: SignUpDTO) {
    const { provider, email, name, password } = body;
    return this.authService.signup(provider, email, name, password);
  }
}
