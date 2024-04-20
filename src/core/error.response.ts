import { reasonPhrases } from '../utils/reasonPhrases';
import { statusCodes } from '../utils/statusCodes';

class ErrorResponse extends Error {
    private status: number;
    private now: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.now = Date.now();
    }
}

export class RedisErrorResponse extends ErrorResponse {
    constructor(message = reasonPhrases.INTERNAL_SERVER_ERROR, statusCode = statusCodes.INTERNAL_SERVER_ERROR) {
        super(message, statusCode);
    }
}
