import "dotenv/config";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";

@Injectable()
export class DrizzleService implements OnModuleInit {
  public db: LibSQLDatabase;

  onModuleInit() {
    this.db = drizzle(process.env.DB_FILE_NAME!, {
      relations: {},
    });
  }
}

// asdf
