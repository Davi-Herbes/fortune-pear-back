import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service.js";
import { compareSync } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException("Usuário ou senha inválidos.");
    }
    if (!compareSync(password, user.passwordHash)) {
      throw new UnauthorizedException("Usuário ou senha inválidos.");
    }
    const payload = { sub: user.id, name: user.name };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
