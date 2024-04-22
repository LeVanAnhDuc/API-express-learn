import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../core/error.response';

export const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new ErrorResponse('Not Found', 404);
    next(error);
};

export const handleError = (error: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.getStatus() ? error.getStatus() : 500;

    return res.status(statusCode).json({
        status: 'Error',
        code: statusCode,
        message: error.message || 'Internal Server error',
    });
};
