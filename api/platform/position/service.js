const bcrypt = require('bcryptjs');
const helper = require('../../../app/helpers/helper');
const Joi = require("joi");

const user = {
    get: async (connection, user) => {
        const userData = await connection.PlatformUsers.findOne({
            where: {id: user.id},
            attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
        });

        return {
            success: true,
            result: {
                user: userData
            }
        };
    },

    all: async (connection, user) => {
        const userData = await connection.PlatformUsers.findOne({
            where: {id: user.id},
            attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
        });

        return {
            success: true,
            result: {
                user: userData
            }
        };
    },

    post: async (connection, options, user) => {
        if (user.type === process.env.PLATFORM_USER_TYPE) {
            await connection.Positions.create({
                ...options,
                id: helper.math.generateNumericUUID(),
                userId: user.id,
                currentPrice: options.amount,
                profit: 0
            });
        }

        return {
            success: true,
            result: {
                message: 'Positions successfully created'
            }
        };
    },

    put: async (connection, options) => {
        const user = await connection.PlatformUsers.findOne({
            where: {id: options.userId}
        });

        if (!user) {
            return helper.doom.error.accountNotFound();
        }

        await user.update(options);

        return {
            success: true,
            result: {
                message: 'User was successfully updated'
            }
        };

    },

    delete: async (connection, options) => {
        const existingPosition = await connection.Positions.findOne({where: {id: options.userId}});

        if (!existingPosition) {
            return {
                success: false,
                result: {message: 'User does not exist'}
            };
        }

        await connection.Positions.destroy({where: {id: options.userId}})

        return {
            success: true,
            result: {message: 'User was successfully deleted'}
        };

    }
};

module.exports = user;
