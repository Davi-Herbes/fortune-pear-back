import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create_user.dto.js";
import { UsersRepository } from "./repositories/users.repository.js";
import { compare, hash } from "bcryptjs";
import { UpdateUserDto } from "./dto/update_user.dto.js";

@Injectable()
export class UsersService {
  constructor(private repo: UsersRepository) {}
  async create({ name, email, password }: CreateUserDto) {
    const passwordHash = await hash(password, 8);

    return this.repo.create({ name, email, passwordHash });
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  findOneByEmail(email: string) {
    return this.repo.findOneByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Checa se o corpo está vazio
    if (Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException("Ao menos um campo deve ser passado.");
    }

    const { name, email, password, credit } = updateUserDto;

    let passwordHash: string = "";
    if (password) {
      passwordHash = await hash(password, 8);
    }

    return this.repo.update(id, { name, email, passwordHash, credit });
  }

  remove(id: string) {
    return this.repo.remove(id);
  }
}
