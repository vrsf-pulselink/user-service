import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "@app/context/user/entity";

export const UserRepositoryToken = "UserRepository";

export interface UserRepository extends Repository<UserEntity> {
  findByUsername(username: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
}

@Injectable()
export class UserPersistence extends Repository<UserEntity> implements UserRepository {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return await this.findOneBy({ username });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.findOneBy({ email });
  }
}
