import { HttpException, HttpStatus } from "@nestjs/common";

export interface InternalServerErrorExceptionResponse {
  code: number;
  error: string;
  message: string;
}

export class InternalServerErrorException extends HttpException {
  constructor(
    message: string,
    error: string = "INTERNAL_SERVER_ERROR",
    code: number = HttpStatus.INTERNAL_SERVER_ERROR
  ) {
    const response: InternalServerErrorExceptionResponse = { error, message, code };

    super(response, code);
  }
}
