import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'validate_user' })
  async validateUser(data: { username: string; password: string }) {
    return this.authService.validateUser(data.username, data.password);
  }

  @MessagePattern({ cmd: 'login' })
  async login(user: any) {
    return this.authService.login(user);
  }

  @MessagePattern({ cmd: 'verify_token' })
  async verifyToken(token: string) {
    return this.authService.validateToken(token);
  }
}