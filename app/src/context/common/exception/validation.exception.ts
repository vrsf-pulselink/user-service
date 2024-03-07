import { HttpException, HttpStatus } from "@nestjs/common";
import { ValidationError } from "class-validator";

export interface ValidationExceptionResponse {
  error: "VALIDATION_ERROR";
  data: ValidationError[];
}

export class ValidationException extends HttpException {
  constructor(data: ValidationError[]) {
    const response: ValidationExceptionResponse = { error: "VALIDATION_ERROR", data };

    super(response, HttpStatus.BAD_REQUEST);
  }
}
