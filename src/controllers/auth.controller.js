import { loginAccountService, registerAccountService } from '../services/auth.service.js';

export const registerAccountController = async (req, res, next) => {
    const { userName, email, passWord } = req.body;

    try {
        const response = await registerAccountService(userName, email, passWord);

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const loginAccountController = async (req, res, next) => {
    const { email, passWord } = req.body;

    try {
        const response = await loginAccountService(email, passWord);
        return res.json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
