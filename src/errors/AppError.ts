export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype); // ¿Qué es esto?
    Error.captureStackTrace(this, this.constructor); // ¿Qué es esto? 
  }

  static badRequest(message: string): AppError {
    return new AppError(message, 400, true);
  }

  static notFound(message: string): AppError {
    return new AppError(message, 404, true);
  }

  static conflict(message: string): AppError {
    return new AppError(message, 409, true);
  }

  static unprocessableEntity(message: string): AppError {
    return new AppError(message, 422, true);
  }

  static internalServerError(message: string): AppError {
    return new AppError(message, 500, false);
  }
}
