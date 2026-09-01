import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { CreateAuthDto } from "./dto/sign_in.dto.js";
import { AuthGuard } from "./auth.guard.js";
import { AuthRequest } from "./types/auth_request.js";
import { FastifyReply } from "fastify";
import { UsersService } from "../users/users.service.js";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post("login")
  async signIn(
    @Body() { email, password }: CreateAuthDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const { access_token } = await this.authService.signIn(email, password);

    res.setCookie("access_token", access_token);

    return { message: "Usuário logado." };
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  async getProfile(@Req() req: AuthRequest) {
    const { sub } = req.user;
    const { passwordHash, id, ...user } = await this.usersService.findOne(sub);
    return user;
  }

  @Delete("logout")
  logOut(
    @Param("id") id: string,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    res.clearCookie("access_token");
    return { message: "Usuário deslogado." };
  }
}
