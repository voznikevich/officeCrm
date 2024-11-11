const Joi = require('joi');

const schemas = {
    router: {
        registration: Joi.object()
            .keys({
                userName: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required(),
                type: Joi.string()
                    .valid('head', 'shift', 'teamLead', 'user')
                    .default('user')
            })
            .required(),

        login: Joi.object()
            .keys({
                email: Joi.string().email().required(),
                password: Joi.string().required()
            })
            .required()
    }
};

module.exports = {
    schemas
};
