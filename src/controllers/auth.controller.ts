import { NextFunction, Request, Response } from 'express';
import { loginAccountService, registerAccountService, refreshTokenService } from '../services/auth.service';

export const registerAccountController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await registerAccountService(req.body);

        return res.status(response.status).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const loginAccountController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await loginAccountService(req.body);
        return res.status(response.status).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await refreshTokenService(req);
        return res.status(response.status).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
