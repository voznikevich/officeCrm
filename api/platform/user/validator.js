const Joi = require('joi');
const bcrypt = require("bcryptjs");

const schemas = {
    router: {
        registration: Joi.object()
            .keys({
                leadId: Joi.number().required(),
            })
            .required(),
        putUser: Joi.object()
            .keys({
                firstName: Joi.string().optional(),
                lastName: Joi.string().optional(),
                country: Joi.string().optional(),
                email: Joi.string().email().optional(),
                phone: Joi.string().allow(null),
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
