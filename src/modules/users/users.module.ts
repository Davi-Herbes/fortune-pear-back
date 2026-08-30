import { Module } from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { UsersController } from "./users.controller.js";
import { UsersRepository } from "./repositories/users.repository.js";
import { DrizzleService } from "../../providers/db/drizzle.service.js";

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, DrizzleService],
  exports: [UsersService],
})
export class UsersModule {}
