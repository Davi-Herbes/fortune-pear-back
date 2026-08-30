import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create_user.dto.js";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {}
