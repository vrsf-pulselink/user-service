import { HttpStatus } from "@nestjs/common";

export interface HealthcheckStatus {
  status: HttpStatus;
}
