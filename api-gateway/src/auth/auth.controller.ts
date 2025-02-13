import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { firstValueFrom } from "rxjs";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(@Inject("AUTH_SERVICE") private readonly authClient: ClientProxy) {}

  @Post("login")
  @ApiOperation({ summary: "Login user" })
  @ApiResponse({ status: 200, description: "Returns JWT token" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async login(@Body() loginDto: { username: string; password: string }) {
    const user = await firstValueFrom(this.authClient.send({ cmd: "validate_user" }, loginDto));

    if (!user) {
      return { statusCode: 401, message: "Invalid credentials" };
    }

    return firstValueFrom(this.authClient.send({ cmd: "login" }, user));
  }

  @Post("verify")
  @ApiOperation({ summary: "Verify JWT token" })
  @ApiResponse({ status: 200, description: "Token is valid" })
  @ApiResponse({ status: 401, description: "Invalid token" })
  async verifyToken(@Body() body: { token: string }) {
    return firstValueFrom(this.authClient.send({ cmd: "verify_token" }, body.token));
  }
}
