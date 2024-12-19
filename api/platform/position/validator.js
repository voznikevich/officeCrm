const Joi = require('joi');
const bcrypt = require("bcryptjs");

const schemas = {
    router: {
        all: Joi.object()
            .keys({
                leadId: Joi.number().required(),
            })
            .required(),
        // post: Joi.object()
            // .keys({
            //     pairId: Joi.number().integer().required(),
            //     userId: Joi.number().integer().required(),
            //     enterPrice: Joi.number().required(),
            //     amount: Joi.number().integer().positive().required(),
            //     takeProfit: Joi.string().pattern(/^\d+(\.\d+)?$/).required(),
            //     stopLoss: Joi.string().pattern(/^\d+(\.\d+)?$/).required(),
            //     type: Joi.string().valid('sell', 'buy').required(),
            //     currentPrice: Joi.string().pattern(/^\d+(\.\d+)?$/).required(),
            //     profit: Joi.string().pattern(/^-?\d+(\.\d+)?$/).allow(null),
            //     createdAt: Joi.date().default(() => new Date(), 'current date'),
            //     updatedAt: Joi.date().default(() => new Date(), 'current date'),
            // })
            // .required(),
        put: Joi.object()
            .keys({
                firstName: Joi.string().optional(),
                lastName: Joi.string().optional(),
                country: Joi.string().optional(),
                email: Joi.string().email().optional(),
                phone: Joi.string().allow(null),
            })
            .required(),
        delete: Joi.object()
            .keys({
                userId: Joi.number().required()
            })
            .required()
    }
};

module.exports = {
    schemas
};
