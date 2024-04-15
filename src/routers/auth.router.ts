import express from 'express';
import {
    registerAccountController,
    loginAccountController,
    refreshTokenController,
} from '../controllers/auth.controller';
import { checkUniqueValues, validateFieldsRequestBody } from '../middlewares/validate.middleware';
import Account from '../models/account.model';
import { CreateAccountDTO, LoginAccountDTO } from '../dto/auth.dto';

const router = express.Router();

router.post(
    '/signup',
    validateFieldsRequestBody(CreateAccountDTO),
    checkUniqueValues(['userName', 'email'], Account),
    (req, res, next) => {
        registerAccountController(req, res, next);
    },
);

router.post('/login', validateFieldsRequestBody(LoginAccountDTO), (req, res, next) => {
    loginAccountController(req, res, next);
});

router.post('/refresh-token', (req, res, next) => {
    refreshTokenController(req, res, next);
});

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

export default router;
