const Joi = require('joi');

const schemas = {
    router: {
        post: Joi.object()
            .keys({
                offerName: Joi.string().required(),
                offer: Joi.string().required(),
                url: Joi.string().uri().optional(),
                userName: Joi.string().optional(),
                referral: Joi.string().optional(),
                description: Joi.string().max(255).optional(),
            })
            .required(),

        put: Joi.object()
            .keys({})
            .required(),

        putUser: Joi.object()
            .keys({})
            .required(),

        deleteUser: Joi.object()
            .keys({})
            .required()
    }
};

module.exports = {
    schemas
};
