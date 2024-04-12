import validator from 'validator';
import lodash from 'lodash';
import { isValidObjectId } from 'mongoose';

const validateEmail = (req, res, next) => {
    const { email } = req.body;

    if (email && !validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    next();
};

const requiredFields = (fields) => (req, res, next) => {
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

const checkUniqueValues = (fields, model) => async (req, res, next) => {
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

const emptyObject = (req, res, next) => {
    if (lodash.isEmpty(req.body)) {
        return res.status(400).json({ error: 'data not empty' });
    }

    next();
};

const isIDObject = (req, res, next) => {
    const { id } = req.params;
    if (id && !isValidObjectId(id)) {
        return res.status(400).json({ error: 'id not valid' });
    }
    next();
};

export { validateEmail, requiredFields, checkUniqueValues, emptyObject, isIDObject };
