import { HttpException, HttpStatus } from "@nestjs/common";

export interface ContextExceptionResponse {
  status: number;
  error: string;
  message: string;
}

export class ContextException extends HttpException {
  constructor(message: string, error: string = "CONTEXT_ERROR", status: number = HttpStatus.INTERNAL_SERVER_ERROR) {
    const response: ContextExceptionResponse = { error, message, status };

    super(response, status);
  }
}
