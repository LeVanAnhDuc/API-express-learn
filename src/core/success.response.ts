import { reasonPhrases } from '../utils/reasonPhrases';
import { statusCodes } from '../utils/statusCodes';

class SuccessResponse {
    private message: string;
    private status: number;
    private reasonStatusCode: string;
    private data: Record<string, any>;

    constructor({ message, status, reasonStatusCode, data }) {
        this.message = message ? message : reasonStatusCode;
        this.status = status;
        this.reasonStatusCode = reasonStatusCode;
        this.data = data;
    }

    public send(res) {
        return res.status(this.status).json(this);
    }
}

export class OKResponse extends SuccessResponse {
    constructor({ message = '', status = statusCodes.OK, reasonStatusCode = reasonPhrases.OK, data }) {
        super({ message, status, reasonStatusCode, data });
    }
}

export class CreatedResponse extends SuccessResponse {
    constructor({ message = '', status = statusCodes.CREATED, reasonStatusCode = reasonPhrases.CREATED, data }) {
        super({ message, status, reasonStatusCode, data });
    }
}
