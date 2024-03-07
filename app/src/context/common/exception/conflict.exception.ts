import { HttpStatus } from "@nestjs/common";
import { ContextException } from "@app/context/common/exception/context.exception";

export class ConflictException extends ContextException {
  constructor(error: string, message: string) {
    super(message, error, HttpStatus.CONFLICT);
  }
}
