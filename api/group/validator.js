const Joi = require('joi');

const schemas = {
    router: {
        post: Joi.object()
            .keys({
                name: Joi.string().required(),
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
