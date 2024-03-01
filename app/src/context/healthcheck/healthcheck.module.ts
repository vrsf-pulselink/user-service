import { Module } from "@nestjs/common";
import { HealthcheckController } from "@app/context/healthcheck/controller";
import { GetHealthcheckStatusUseCase } from "@app/context/healthcheck/use-case";

@Module({
  controllers: [HealthcheckController],
  providers: [GetHealthcheckStatusUseCase],
})
export class HealthcheckModule {
}
