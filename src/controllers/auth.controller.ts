// libs
import { NextFunction, Request, Response } from 'express';
// services
import AuthService from '../services/auth.service';
// others
import { CreatedResponse, OKResponse } from '../core/success.response';

class AuthController {
  login = async (req: Request, res: Response, next: NextFunction) => {
    return new OKResponse(await AuthService.login(req.body)).send(res);
  };

  signup = async (req: Request, res: Response, next: NextFunction) => {
    return new CreatedResponse(await AuthService.signup(req.body)).send(res);
  };

  //   verifyRegisterAccount = async (req: Request, res: Response, next: NextFunction) => {
  //     return new OKResponse(await AuthService.verifyRegisterAccount(req.body)).send(res);
  //   };

  //   reSendOTPRegister = async (req: Request, res: Response, next: NextFunction) => {
  //     return new OKResponse(await AuthService.reSendOTPRegister(req.body)).send(res);
  //   };

  //   refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  //     return new CreatedResponse(await AuthService.refreshAccessToken(req)).send(res);
  //   };
}

export default new AuthController();
