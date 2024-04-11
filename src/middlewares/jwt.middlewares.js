const Account = require('../models/account.model');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../constants');

const createToken = async (req, res, next) => {
    const { email, passWord } = req.body;

    try {
        const infoUser = await Account.findOne({
            email,
            passWord,
        });

        if (infoUser) {
            req.jwt = jwt.sign(
                {
                    id: infoUser._id,
                },
                secretKey,
            );
            req.infoUser = infoUser;
        } else {
            return res.status(404).json({ error: 'user not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }

    next();
};

module.exports = { createToken };
