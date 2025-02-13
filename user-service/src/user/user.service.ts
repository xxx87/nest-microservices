import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(data: { email: string; name?: string }) {
    return this.prisma.user.create({
      data
    });
  }

  async findUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id }
    });
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }

  async updateUser(id: number, data: { email?: string; name?: string }) {
    return this.prisma.user.update({
      where: { id },
      data
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id }
    });
  }

  async listUsers() {
    return this.prisma.user.findMany();
  }
}
