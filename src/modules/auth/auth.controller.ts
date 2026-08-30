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

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  getProfile(@Req() req: AuthRequest) {
    return req.user;
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
