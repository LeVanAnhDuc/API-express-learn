import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { CreatedResponse, OKResponse } from '../core/success.response';

class AuthController {
    registerAccount = async (req: Request, res: Response, next: NextFunction) => {
        return new CreatedResponse(await AuthService.registerAccount(req.body)).send(res);
    };

    verifyRegisterAccount = async (req: Request, res: Response, next: NextFunction) => {
        return new CreatedResponse(await AuthService.verifyRegisterAccount(req.body)).send(res);
    };

    reSendOTPRegister = async (req: Request, res: Response, next: NextFunction) => {
        return new CreatedResponse(await AuthService.reSendOTPRegister(req.body)).send(res);
    };

    loginAccount = async (req: Request, res: Response, next: NextFunction) => {
        return new OKResponse(await AuthService.loginAccount(req.body)).send(res);
    };

    refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        return new CreatedResponse(await AuthService.refreshToken(req)).send(res);
    };
}

export default new AuthController();
