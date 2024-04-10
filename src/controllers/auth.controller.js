const Account = require('../models/account.model');

const registerAccount = async (req, res, next) => {
    const { userName, email, passWord } = req.body;

    try {
        const newAccount = new Account({ userName, email, passWord });
        await newAccount.save();

        return res.status(201).json({ message: 'register todo successfully', data: newAccount });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { registerAccount };
