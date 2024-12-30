const helper = require('../../../app/helpers/helper');
const {Sequelize} = require("sequelize");

const position = {
    all: async (connection, options, user) => {
        const limit = options.limit || 10;
        const offset = options.page ? (options.page - 1) * limit : 0;

        const {count, rows: payments} = await connection.Payments.findAndCountAll({
            limit,
            offset
        });

        return {
            success: true,
            result: {
                total: count,
                totalPages: Math.ceil(count / limit),
                payments,
            }
        };
    },

    put: async (connection, options, user) => {
        if (user.type === process.env.PLATFORM_USER_TYPE) {
            await connection.Payments.update({status: options.status}, {
                where: {id: options.paymentId},
            });

        }
        return {
            success: true,
            result: {
                message: 'Payment status successfully updated'
            }
        };
    },

    post: async (connection, options, user) => {
        if (user.type === process.env.PLATFORM_USER_TYPE) {
            if (options.pay_method === 'payout') {
                if (!options.wallet_address && !options.card_number) {
                    return helper.doom.error.addressOrCardNotFound()
                }
            }

            await connection.Payments.create({
                ...options,
                platform_user: user.id
            });
        }
        return {
            success: true,
            result: {
                message: 'Payments successfully created'
            }
        };
    },

};

module.exports = position;
