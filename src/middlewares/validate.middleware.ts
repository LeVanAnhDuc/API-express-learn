import { NextFunction, Request, Response } from 'express';
import validator from 'validator';
import lodash from 'lodash';
import { isValidObjectId } from 'mongoose';
import { plainToClass, ClassConstructor, classToPlain } from 'class-transformer';
import { validate } from 'class-validator';

export const validateFieldsRequestBody =
    <T extends object>(type: ClassConstructor<T>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const dtoInstance = plainToClass(type, req.body, { excludeExtraneousValues: true });
        const errorsValidate = await validate(dtoInstance);

        const messageError: {
            property: string;
            constraints: { [type: string]: string };
        }[] = [];

        errorsValidate.forEach((error) =>
            messageError.push({
                property: error.property,
                constraints: error.constraints,
            }),
        );

        if (messageError.length > 0) {
            return res.status(400).json({
                errors: messageError,
            });
        }

        req.body = classToPlain(dtoInstance);
        next();
    };

export const validateFieldsRequestQuery =
    <T extends object>(type: ClassConstructor<T>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const dtoInstance = plainToClass(type, req.query, { excludeExtraneousValues: true });
        const errorsValidate = await validate(dtoInstance);

        const messageError: {
            property: string;
            constraints: { [type: string]: string };
        }[] = [];

        errorsValidate.forEach((error) =>
            messageError.push({
                property: error.property,
                constraints: error.constraints,
            }),
        );

        if (messageError.length > 0) {
            return res.status(400).json({
                errors: messageError,
            });
        }

        req.query = classToPlain(dtoInstance);
        next();
    };

export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (email && !validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    next();
};

export const requiredFields = (fields: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const errors = [];

    fields.forEach((field) => {
        if (!req.body[field]) {
            errors.push(`${field} is required`);
        }
    });

    if (errors.length > 0) {
        return res.status(400).json({ error: errors.join(', ') });
    }

    next();
};

export const checkUniqueValues =
    (fields: string[], model) => async (req: Request, res: Response, next: NextFunction) => {
        const errors = [];

        for (const field of fields) {
            try {
                const fieldExist = await model.exists({ [field]: req.body[field] });

                if (fieldExist) {
                    errors.push(`${field} is exist`);
                }
            } catch (error) {
                return res.status(500).json({ error: 'Internal server error' });
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ error: errors.join(', ') });
        }

        next();
    };

export const requiredBody = (req: Request, res: Response, next: NextFunction) => {
    if (lodash.isEmpty(req.body)) {
        return res.status(400).json({ error: 'data not empty' });
    }

    next();
};

export const isIDObject = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (id && !isValidObjectId(id)) {
        return res.status(400).json({ error: 'id not valid' });
    }

    next();
};
