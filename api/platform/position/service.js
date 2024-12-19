const helper = require('../../../app/helpers/helper');
const {Sequelize} = require("sequelize");

const position = {
    get: async (connection, options, user) => {
        const position = await connection.Positions.findOne({
            where: {
                id: options.positionId,
                userId: user.id
            },
            include: [{
                required: false,
                model: connection.Pairs,
                as: "pair",
            }],
            attributes: {exclude: ['createdAt', 'updatedAt', 'pairId']}
        });

        return {
            success: true,
            result: {
                position
            }
        };
    },

    all: async (connection, user) => {
        const positions = await connection.Positions.findAll({
            where: {userId: user.id},
            include: [{
                required: false,
                model: connection.Pairs,
                as: "pair",
            }],
            attributes: {exclude: ['createdAt', 'updatedAt', 'pairId']}
        });

        return {
            success: true,
            result: {
                positions
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

    put: async (connection, options, user) => {
        const position = await connection.Positions.findOne({where: {id: options.positionId}});

        if (!position) {
            return helper.doom.error.positionNotFound();
        }

        await position.update(options);

        if (options.isActive === false) {
            await connection.PlatformUsers.update(
                {balance: Sequelize.literal(`balance + ${position.profit}`)},
                {where: {id: user.id}}
            );
        }

        return {
            success: true,
            result: {
                message: 'Position was successfully updated'
            }
        };
    },

    delete: async (connection, options, user) => {
        const result = await connection.Positions.destroy({
            where: {
                id: options.positionId,
                userId: user.id
            }
        });

        if (result === 0) {
            return {
                success: false,
                result: {message: 'Position does not exist'}
            };
        }

        return {
            success: true,
            result: {message: 'Position successfully deleted'}
        };
    }
};

module.exports = position;
