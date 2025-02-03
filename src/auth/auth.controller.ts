import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginInputDto, signUpInputDto } from './dto';



@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('signup')
  signup(@Body() dto: signUpInputDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: loginInputDto) {
    return this.authService.login(dto);
  }
}

