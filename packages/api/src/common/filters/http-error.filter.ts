import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { APIError } from "better-auth/api";
import { Response } from "express";

@Catch(HttpException, APIError)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException | APIError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      "getStatus" in exception ? exception.getStatus() : exception.statusCode;

    response.status(status).json({
      ok: false,
      error: {
        code: status,
        message: exception.message,
      },
    });
  }
}
