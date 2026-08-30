import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { DrizzleService } from "./providers/db/drizzle.service.js";
import { UsersModule } from "./modules/users/users.module.js";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module.js";

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, DrizzleService],
})
export class AppModule {}
