import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UsersController } from "./users.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "localhost",
          port: 3002
        }
      },
      {
        name: "AUTH_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "localhost",
          port: 3001
        }
      }
    ]),
    AuthModule
  ],
  controllers: [UsersController]
})
export class UsersModule {}
