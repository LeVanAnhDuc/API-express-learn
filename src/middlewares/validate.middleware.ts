import { Request } from 'express';
import lodash from 'lodash';
import { Model, Document, isValidObjectId, FilterQuery } from 'mongoose';
import { plainToClass, ClassConstructor, classToPlain } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestError } from '../core/error.response';

const validateFields = async <T extends object>(req: Request, type: ClassConstructor<T>, source: 'body' | 'query') => {
    const dtoInstance = plainToClass(type, req[source], { excludeExtraneousValues: true });

    const errorsValidate = await validate(dtoInstance);

    if (errorsValidate.length > 0) {
        const errorMessage = errorsValidate.map((obj) => Object.values(obj.constraints).join(', ')).join(', ');

        throw new BadRequestError(errorMessage.trim());
    }

    if (source === 'body') {
        req.body = classToPlain(dtoInstance);
    }
};

export const validateFieldsRequestBody = <T extends object>(type: ClassConstructor<T>) => {
    return async (req: Request) => {
        await validateFields(req, type, 'body');
    };
};

export const validateFieldsRequestQuery = <T extends object>(type: ClassConstructor<T>) => {
    return async (req: Request) => {
        await validateFields(req, type, 'query');
    };
};

export const checkUniqueValues = <T extends Document, K extends keyof Omit<T, keyof Document>>(
    fields: K[],
    model: Model<T>,
) => {
    return async (req: Request) => {
        const errors = [];

        for (const field of fields) {
            const query: FilterQuery<T> = { [field]: req.body[field] } as FilterQuery<T>;

            const fieldExist = await model.exists(query);

            if (fieldExist) {
                errors.push(`${field as string} is exist`);
            }
        }

        if (errors.length > 0) {
            throw new BadRequestError(errors.join(', '));
        }
    };
};

export const requiredBody = (req: Request) => {
    if (lodash.isEmpty(req.body)) {
        throw new BadRequestError('data not empty');
    }

    return Promise.resolve();
};

export const isIDObject = (req: Request) => {
    const { id } = req.params;

    if (id && !isValidObjectId(id)) {
        throw new BadRequestError('id not valid');
    }

    return Promise.resolve();
};
