import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { DrizzleService } from "./providers/db/drizzle.service.js";
import { UsersModule } from "./modules/users/users.module.js";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module.js";
import { GameModule } from "./modules/game/game.module.js";

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, GameModule],
  controllers: [AppController],
  providers: [AppService, DrizzleService],
})
export class AppModule {}
