import { User } from "@app/context/user/interface/user.interface";
import { Inject, Injectable } from "@nestjs/common";
import { UserRepository, UserRepositoryToken } from "@app/context/user/repository";

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly usersRepository: UserRepository
  ) {}

  async create(): Promise<User> {
    return await this.usersRepository.create();
  }
}
