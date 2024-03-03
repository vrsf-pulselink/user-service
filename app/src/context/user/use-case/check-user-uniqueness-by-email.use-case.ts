import { User } from "@app/context/user/interface/user.interface";
import { UserWithEmailAlreadyExistsException } from "@app/context/user/exception";
import { Inject, Injectable } from "@nestjs/common";
import { UserRepository, UserRepositoryToken } from "@app/context/user/repository";

@Injectable()
export class CheckUserUniquenessByEmailUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly usersRepository: UserRepository
  ) {}

  async check(user: User): Promise<void> {
    const userExists = await this.usersRepository.findByEmail(user.email);

    if (userExists) {
      throw new UserWithEmailAlreadyExistsException();
    }
  }
}
