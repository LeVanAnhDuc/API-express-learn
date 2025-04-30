import { reasonPhrases } from '../utils/reasonPhrases';
import { statusCodes } from '../utils/statusCodes';

export class ErrorResponse extends Error {
  private status: number;
  private now: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.now = Date.now();
  }

  public getStatus = () => this.status;
}

export class ConflictRequestError extends ErrorResponse {
  constructor(message = reasonPhrases.CONFLICT) {
    super(message, statusCodes.CONFLICT);
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(message = reasonPhrases.BAD_REQUEST) {
    super(message, statusCodes.BAD_REQUEST);
  }
}

export class ForbiddenError extends ErrorResponse {
  constructor(message = reasonPhrases.FORBIDDEN) {
    super(message, statusCodes.FORBIDDEN);
  }
}

export class NotFoundError extends ErrorResponse {
  constructor(message = reasonPhrases.NOT_FOUND) {
    super(message, statusCodes.NOT_FOUND);
  }
}

export class UnauthorizedError extends ErrorResponse {
  constructor(message = reasonPhrases.UNAUTHORIZED) {
    super(message, statusCodes.UNAUTHORIZED);
  }
}

export class RedisErrorResponse extends ErrorResponse {
  constructor(message = reasonPhrases.INTERNAL_SERVER_ERROR, statusCode = statusCodes.INTERNAL_SERVER_ERROR) {
    super(message, statusCode);
  }
}

export class MongoErrorResponse extends ErrorResponse {
  constructor(message = reasonPhrases.INTERNAL_SERVER_ERROR, statusCode = statusCodes.INTERNAL_SERVER_ERROR) {
    super(message, statusCode);
  }
}
