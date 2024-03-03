import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      autoLoadEntities: true,
      synchronize: false,

      host: this.config.get<string>("databaseHost"),
      port: this.config.get<number>("databasePort", 5432),
      username: this.config.get<string>("databaseUser"),
      password: this.config.get<string>("databasePassword"),
      database: this.config.get<string>("databaseName"),

      entities: [__dirname + "/../app/**/*.entity{.ts,.js}"],
      migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
    };
  }
}
