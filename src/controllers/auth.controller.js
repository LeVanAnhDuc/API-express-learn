import { createTokenAndFindInfo, createAccount } from '../services/auth.service.js';

const registerAccount = async (req, res, next) => {
    const { userName, email, passWord } = req.body;

    try {
        const response = await createAccount(userName, email, passWord);

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const loginAccount = async (req, res, next) => {
    const { email, passWord } = req.body;

    try {
        const response = await createTokenAndFindInfo(email, passWord);
        return res.json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export { registerAccount, loginAccount };
