import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { firstValueFrom } from "rxjs";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("users")
@Controller("users")
@ApiBearerAuth()
export class UsersController {
  constructor(@Inject("USER_SERVICE") private readonly userClient: ClientProxy) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({ status: 201, description: "User created successfully" })
  async createUser(@Body() createUserDto: { email: string; name?: string }) {
    return firstValueFrom(this.userClient.send({ cmd: "create_user" }, createUserDto));
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get user by ID" })
  @ApiResponse({ status: 200, description: "Returns the user" })
  async getUserById(@Param("id") id: number) {
    return firstValueFrom(this.userClient.send({ cmd: "find_user_by_id" }, id));
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update user" })
  @ApiResponse({ status: 200, description: "User updated successfully" })
  async updateUser(@Param("id") id: number, @Body() updateUserDto: { email?: string; name?: string }) {
    return firstValueFrom(this.userClient.send({ cmd: "update_user" }, { id, ...updateUserDto }));
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Delete user" })
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  async deleteUser(@Param("id") id: number) {
    return firstValueFrom(this.userClient.send({ cmd: "delete_user" }, id));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "Returns all users" })
  async getAllUsers() {
    return firstValueFrom(this.userClient.send({ cmd: "list_users" }, {}));
  }
}
