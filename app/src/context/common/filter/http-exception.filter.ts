import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { ContextException, ValidationException, ValidationExceptionResponse } from "@app/context/common/exception";

interface ErrorNodeResponse {
  path: string;
  value: unknown;
  constraints: Record<string, string>;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException | Error, host: ArgumentsHost): Promise<Response> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();

    // Catch Domain Exception
    if (exception instanceof ContextException) {
      console.debug(`${exception.message}: ${JSON.stringify(request.body as unknown)}`);

      return response.status(exception.getStatus()).json(exception.getResponse());
    }

    // Catch Validation Exception
    if (exception instanceof ValidationException) {
      const exceptionResponse = exception.getResponse() as ValidationExceptionResponse;
      const validationData = this.parseValidationData(exceptionResponse.data);

      console.debug(
        `Validation Error: [${exception.constructor.name}]: ${JSON.stringify(
          this.parseValidationData(exceptionResponse.data)
        )}`
      );

      return response.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        error: "VALIDATION_ERROR",
        message: "One or more fields are not valid.",
        data: validationData,
      });
    }

    // Catch NotFound Exception
    if (exception instanceof NotFoundException) {
      console.debug(`NotFoundError: ${exception.message}`);

      return response.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        error: "NOT_FOUND_ERROR",
        message: exception.message,
      });
    }

    // The final catch
    console.error(`[${exception.constructor.name}] Internal Server Error: ${exception.message}`, {
      body: JSON.stringify(request.body), // Think about this
      headers: JSON.stringify(request.headers),
      path: request.url,
    });
    console.trace(
      `[${exception.constructor.name}] Stack trace: ${JSON.stringify(
        exception.stack ? exception.stack.split("\n").map((a) => a.trim().replace(/^at /, "")) : []
      )}`
    );

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong.",
    });
  }

  private parseValidationData(node: ValidationError[]): ErrorNodeResponse[] {
    const responseData: ErrorNodeResponse[] = [];
    const processInner = (path: string, node: ValidationError, isArrayNode: boolean): void => {
      let jsonPath = path === "" ? node.property : `${path}.${node.property}`;

      if (isArrayNode) {
        jsonPath = path === "" ? node.property : `${path}[${node.property}]`;
      }

      if (node.constraints) {
        responseData.push({
          path: jsonPath,
          value: node.value,
          constraints: node.constraints,
        });
      }

      if (node.children && node.children.length > 0) {
        node.children.map((a) => processInner(jsonPath, a, Array.isArray(node.value)));
      }
    };

    node.map((a) => {
      processInner("", a, Array.isArray(a.value));
    });

    return responseData;
  }
}
