import { Module } from "@nestjs/common";
import { HealthcheckModule } from "@app/context/healthcheck/healthcheck.module";
import { ConfigModule } from "@nestjs/config";
import { config as appConfig } from "@app/app.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ["../.env", ".env"],
    }),
    HealthcheckModule,
  ],
})
export class AppModule {
}
