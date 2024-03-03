import { User } from "@app/context/user/interface/user.interface";
import { UserWithUsernameAlreadyExistsException } from "@app/context/user/exception";
import { Inject, Injectable } from "@nestjs/common";
import { UserRepository, UserRepositoryToken } from "@app/context/user/repository";

@Injectable()
export class CheckUserUniquenessByUsernameUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly usersRepository: UserRepository
  ) {}

  async check(user: User): Promise<void> {
    const userExists = await this.usersRepository.findByUsername(user.username);

    if (userExists) {
      throw new UserWithUsernameAlreadyExistsException();
    }
  }
}
