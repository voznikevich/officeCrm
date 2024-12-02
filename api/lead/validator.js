const Joi = require('joi');

const schemas = {
    router: {
        post: Joi.object()
            .keys({
                userName: Joi.string().required(),
                email: Joi.string().required(),
                phone: Joi.string().allow(null),
                country: Joi.string().required(),
                language: Joi.string().required(),
                affiliate: Joi.number().integer().required(),
                manager: Joi.number().integer().required(),
                comment: Joi.number().integer().allow(null),
                status: Joi.string().valid(
                    'new',
                    'no answer',
                    'newer answer',
                    'slip away',
                    'not interested',
                    'no pot',
                    'callback',
                    'reassign',
                    'active'
                ).default('new')
            })
            .required(),

        put: Joi.object()
            .keys({
                userName: Joi.string().optional(),
                country: Joi.string().optional(),
                language: Joi.string().optional(),
                affiliate: Joi.number().integer().optional(),
                manager: Joi.number().integer().optional(),
                comment: Joi.number().integer().allow(null),
                status: Joi.string().valid(
                    'new',
                    'no answer',
                    'newer answer',
                    'slip away',
                    'not interested',
                    'no pot',
                    'callback',
                    'reassign',
                    'active'
                ).default('new')
            })
            .required(),

        putUser: Joi.object()
            .keys({
                userId: Joi.number().optional(),
                email: Joi.string().email().optional(),
                group: Joi.string()
                    .valid('sales', 'reten', 'buyer').optional(),
                userName: Joi.string().optional(),
                password: Joi.string().optional(),
            })
            .required(),

        deleteUser: Joi.object()
            .keys({
                userId: Joi.number().required()
            })
            .required()
    }
};

module.exports = {
    schemas
};
