import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create_user' })
  async createUser(data: { email: string; name?: string }) {
    return this.userService.createUser(data);
  }

  @MessagePattern({ cmd: 'find_user_by_id' })
  async findUserById(id: number) {
    return this.userService.findUserById(id);
  }

  @MessagePattern({ cmd: 'find_user_by_email' })
  async findUserByEmail(email: string) {
    return this.userService.findUserByEmail(email);
  }

  @MessagePattern({ cmd: 'update_user' })
  async updateUser(data: { id: number; email?: string; name?: string }) {
    return this.userService.updateUser(data.id, {
      email: data.email,
      name: data.name,
    });
  }

  @MessagePattern({ cmd: 'delete_user' })
  async deleteUser(id: number) {
    return this.userService.deleteUser(id);
  }

  @MessagePattern({ cmd: 'list_users' })
  async listUsers() {
    return this.userService.listUsers();
  }
}