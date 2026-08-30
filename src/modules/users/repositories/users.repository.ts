import { Injectable } from "@nestjs/common";
import { CreateUserData } from "../interfaces/create_user.data.js";
import { UpdateUserData } from "../interfaces/update_user.data.js";
import { DrizzleService } from "../../../providers/db/drizzle.service.js";
import { users } from "../users.schema.js";
import { eq } from "drizzle-orm";

@Injectable()
export class UsersRepository {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(createUserData: CreateUserData) {
    try {
      const [user] = await this.drizzle.db
        .insert(users)
        .values(createUserData)
        .returning({ id: users.id });

      return user;
    } catch (e) {
      return { id: "" };
    }
  }

  findAll() {
    return this.drizzle.db.select().from(users);
  }

  async findOne(id: string) {
    const [user] = await this.drizzle.db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return user;
  }

  async findOneByEmail(email: string) {
    const [user] = await this.drizzle.db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return user;
  }

  update(id: string, updateUserData: UpdateUserData) {
    return this.drizzle.db
      .update(users)
      .set(updateUserData)
      .where(eq(users.id, id));
  }

  remove(id: string) {
    return this.drizzle.db.delete(users).where(eq(users.id, id));
  }
}
