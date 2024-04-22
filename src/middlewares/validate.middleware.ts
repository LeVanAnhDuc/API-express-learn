import { NextFunction, Request, Response } from 'express';
import lodash from 'lodash';
import { Model, Document, isValidObjectId, FilterQuery } from 'mongoose';
import { plainToClass, ClassConstructor, classToPlain } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestError } from '../core/error.response';

export const validateFieldsRequestBody =
    <T extends object>(type: ClassConstructor<T>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const dtoInstance = plainToClass(type, req.body, { excludeExtraneousValues: true });
        req.body = classToPlain(dtoInstance);

        const errorsValidate = await validate(dtoInstance);

        let messageError: string = '';

        errorsValidate.forEach((error) => {
            Object.values(error.constraints).forEach((constraint) => {
                messageError += `${constraint}, `;
            });
        });

        if (messageError) {
            throw new BadRequestError(messageError);
        }
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

export const checkUniqueValues =
    <T extends Document>(fields: string[], model: Model<T>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = [];

        for (const field of fields) {
            const query: FilterQuery<T> = { [field]: req.body[field] } as FilterQuery<T>;
            const fieldExist = await model.exists(query);

            if (fieldExist) {
                errors.push(`${field} is exist`);
            }
        }

        if (errors.length > 0) {
            throw new BadRequestError(errors.join(', '));
        }
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
