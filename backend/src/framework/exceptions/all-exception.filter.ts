import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus
  } from "@nestjs/common";
import { ResponseService } from "../response/response.service";
import { AppLogger } from "../utils/logger.util";
 
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly responseService: ResponseService) {}
  
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = "Internal server error";
  
      // Improve error logging
      AppLogger.error(`Exception caught: ${exception}`, "AllExceptionsFilter");
  
      if (exception instanceof Error) {
        AppLogger.error(`Stack trace: ${exception.stack}`, "AllExceptionsFilter");
      }
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
  
        AppLogger.error(
          `HttpException: ${JSON.stringify(exceptionResponse)}`,
          "AllExceptionsFilter"
        );
  
        message =
          typeof exceptionResponse === "string"
            ? exceptionResponse
            : (exceptionResponse as any).message || message;
      }
  
      const errorResponse = this.responseService.error({
        errors:
          exception instanceof Error
            ? exception.message || "An unexpected error occurred"
            : "An unexpected error occurred",
        message,
        code: status
      });
  
      response.status(status).json(errorResponse);
    }
  }
  