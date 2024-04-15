import { loginAccountService, registerAccountService, getAccessTokenService } from '../services/auth.service.js';

export const registerAccountController = async (req, res, next) => {
    const { userName, email, passWord } = req.body;

    try {
        const response = await registerAccountService(userName, email, passWord);

        return res.status(response.status).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const loginAccountController = async (req, res, next) => {
    const { email, passWord } = req.body;

    try {
        const response = await loginAccountService(email, passWord);
        return res.status(response.status).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const refreshTokenController = async (req, res, next) => {
    try {
        const response = await refreshTokenService(req);
        return res.status(response.status).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
