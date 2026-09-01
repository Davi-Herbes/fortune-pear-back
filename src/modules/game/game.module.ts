import { Module } from "@nestjs/common";
import { GameController } from "./game.controller.js";
import { UsersService } from "../users/users.service.js";
import { UsersModule } from "../users/users.module.js";

@Module({
  imports: [UsersModule],
  controllers: [GameController],
  exports: [],
})
export class GameModule {}
