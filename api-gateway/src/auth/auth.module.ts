import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthController } from "./auth.controller";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "AUTH_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "localhost",
          port: 3001
        }
      }
    ])
  ],
  controllers: [AuthController],
  providers: [JwtAuthGuard],
  exports: [JwtAuthGuard]
})
export class AuthModule {}
