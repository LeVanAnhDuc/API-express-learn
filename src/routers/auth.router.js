const express = require('express');
const { registerAccount, loginAccount } = require('../controllers/auth.controller');
const { validateEmail, requiredFields, checkUniqueValues } = require('../middlewares');
const { createToken } = require('../middlewares/jwt.middlewares');
const Account = require('../models/account.model');

const router = express.Router();

router.post(
    '/signup',
    requiredFields(['userName', 'email', 'passWord']),
    checkUniqueValues(['userName', 'email'], Account),
    validateEmail,
    (req, res, next) => {
        registerAccount(req, res, next);
    },
);

router.post('/login', requiredFields(['email', 'passWord']), validateEmail, createToken, (req, res, next) => {
    loginAccount(req, res, next);
});

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

module.exports = router;
