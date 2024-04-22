import { NextFunction, Request, Response } from 'express';
import { loginAccountService, registerAccountService, refreshTokenService } from '../services/auth.service';
import { CreatedResponse, OKResponse } from '../core/success.response';

export const registerAccountController = async (req: Request, res: Response, next: NextFunction) => {
    return new CreatedResponse(await registerAccountService(req.body)).send(res);
};

export const loginAccountController = async (req: Request, res: Response, next: NextFunction) => {
    return new OKResponse(await loginAccountService(req.body)).send(res);
};

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
    return new CreatedResponse(await refreshTokenService(req)).send(res);
};
