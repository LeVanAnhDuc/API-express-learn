const Account = require('../models/account.model');

const registerAccount = async (req, res, next) => {
    const { userName, email, passWord } = req.body;

    try {
        const newAccount = new Account({ userName, email, passWord });
        await newAccount.save();

        return res.status(201).json({ message: 'register  successfully', data: newAccount });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const loginAccount = async (req, res, next) => {
    const { jwt, infoUser } = req;

    try {
        return res.status(200).json({
            message: 'login successfully',
            data: {
                token: jwt,
                infoUser: {
                    userName: infoUser.userName,
                    email: infoUser.email,
                },
            },
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { registerAccount, loginAccount };
