import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@app/context/user/entity";
import { UserPersistence, UserRepositoryToken } from "@app/context/user/repository";
import { UserController } from "@app/context/user/controller";
import {
  CheckUserUniquenessByEmailUseCase,
  CheckUserUniquenessByUsernameUseCase,
  CreateUserUseCase,
} from "@app/context/user/use-case";

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: UserRepositoryToken,
      useClass: UserPersistence,
    },
    CheckUserUniquenessByEmailUseCase,
    CheckUserUniquenessByUsernameUseCase,
    CreateUserUseCase,
  ],
})
export class UserModule {}
