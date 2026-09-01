import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create_user.dto.js";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  @IsNotEmpty()
  credit: number;
}
