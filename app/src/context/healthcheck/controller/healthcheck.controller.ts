import { Controller, Get } from "@nestjs/common";
import { HealthcheckStatus } from "@app/context/healthcheck/interface/healthcheck-status.interface";
import { GetHealthcheckStatusUseCase } from "@app/context/healthcheck/use-case/get-healthcheck-status.use-case";

@Controller("_healthcheck")
export class HealthcheckController {
  constructor(private readonly healthcheckStatus: GetHealthcheckStatusUseCase) {}

  @Get()
  public healthStatus(): HealthcheckStatus {
    return this.healthcheckStatus.get();
  }
}
