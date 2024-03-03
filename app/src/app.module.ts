import { Module } from "@nestjs/common";
import { HealthcheckModule } from "@app/context/healthcheck/healthcheck.module";
import { ConfigModule } from "@nestjs/config";
import { config as appConfig } from "@app/app.config";
import { UserModule } from "@app/context/user/user.module";
import { DataSource, DataSourceOptions } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "@app/database/typeorm-config.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ["../.env", ".env"],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => new DataSource(options).initialize(),
    }),
    HealthcheckModule,
    UserModule,
  ],
})
export class AppModule {}
