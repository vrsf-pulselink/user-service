import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserUseCase } from "@app/context/user/use-case";
import { User } from "@app/context/user/interface/user.interface";

@Controller("users")
export class UserController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @Get()
  async list(): Promise<User[]> {
    return [];
  }

  @Post()
  async create(@Body() _data: string): Promise<User> {
    const user = await this.createUser.create();
    // Xxx
    return user;
  }
}
