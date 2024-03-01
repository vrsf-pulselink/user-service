import { HttpStatus, Injectable } from "@nestjs/common";
import { HealthcheckStatus } from "@app/context/healthcheck/interface/healthcheck-status.interface";

@Injectable()
export class GetHealthcheckStatusUseCase {
  get(): HealthcheckStatus {
    return {
      status: HttpStatus.OK,
    };
  }
}
