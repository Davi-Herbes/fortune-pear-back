import {
  BadRequestException,
  Controller,
  Get,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard.js";
import { AuthRequest } from "../auth/types/auth_request.js";
import { UsersService } from "../users/users.service.js";
import { makeResult } from "./utils/make-result.js";

@Controller("game")
export class GameController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async generateResult(@Req() req: AuthRequest) {
    const {
      user: { sub },
    } = req;

    const [a, b, c] = makeResult();

    const user = await this.userService.findOne(sub);

    let balance = 0;

    if (a === b && b === c) {
      balance += (a + 1) * 5;
    } else balance -= 2;

    user.credit += balance;

    const result = await this.userService.update(sub, {
      credit: user.credit,
    });

    console.log(result);

    if (!result) {
      throw new BadRequestException();
    }

    return { results: [a, b, c], user };
  }
}
