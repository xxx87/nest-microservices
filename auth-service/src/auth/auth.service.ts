import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  // In a real application, this would be stored in a database
  private readonly users = [
    {
      userId: 1,
      username: "john",
      password: "$2a$10$Zi3iMqm/uCPg9FCBldiIbOkYFvKy5dvSorYsyTk7OzpjGedF3etGu" // 'Aa12345678!'
    }
  ];

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = this.users.find((u) => u.username === username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async validateToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token);
      return { userId: payload.sub, username: payload.username };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
