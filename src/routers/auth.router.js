import express from 'express';
import {
    registerAccountController,
    loginAccountController,
    getAccessTokenController,
} from '../controllers/auth.controller.js';
import { validateEmail, requiredFields, checkUniqueValues } from '../middlewares/validate.middleware.js';
import Account from '../models/account.model.js';

const router = express.Router();

router.post(
    '/signup',
    requiredFields(['userName', 'email', 'passWord']),
    checkUniqueValues(['userName', 'email'], Account),
    validateEmail,
    (req, res, next) => {
        registerAccountController(req, res, next);
    },
);

router.post('/login', requiredFields(['email', 'passWord']), validateEmail, (req, res, next) => {
    loginAccountController(req, res, next);
});

router.post('/refresh-token', (req, res, next) => {
    getAccessTokenController(req, res, next);
});

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

export default router;
