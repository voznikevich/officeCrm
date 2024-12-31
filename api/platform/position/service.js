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
            attributes: {exclude: ['updatedAt', 'pairId']}
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

            const platformUser = await connection.PlatformUsers.findOne({where: {id: user.id}});

            if (platformUser.balance < 0 || platformUser.balance < options.amount) {
                return helper.doom.error.balanceIsLess()
            }

            const pairData = await connection.Pairs.findOne({
                where: {
                    id: options.pairId
                }
            });

            if (pairData) {
                if (pairData.type === 'forex') {
                    const fromCurrency = pairData.pair.split('/')[0];
                    const toCurrency = pairData.pair.split('/')[1];

                    const enterPrice = await helper.forex.getExchangeRate(fromCurrency, toCurrency);

                    await connection.Positions.create({
                        ...options,
                        id: helper.math.generateNumericUUID(),
                        userId: user.id,
                        enterPrice,
                        currentPrice: enterPrice,
                        profit: 0
                    });
                }

                if (pairData.type === 'crypto') {
                    const pair = pairData.pair.split('/').join('');
                    const enterPrice = await helper.binance.getExchangeRate(pair);

                    await connection.Positions.create({
                        ...options,
                        id: helper.math.generateNumericUUID(),
                        userId: user.id,
                        enterPrice,
                        currentPrice: enterPrice,
                        profit: 0
                    });
                }

                if (pairData.type === 'stock') {
                    const enterPrice = await helper.stock.getExchangeRate(pairData.pair);

                    await connection.Positions.create({
                        ...options,
                        id: helper.math.generateNumericUUID(),
                        userId: user.id,
                        enterPrice,
                        currentPrice: enterPrice,
                        profit: 0
                    });
                }

            }

            // await connection.Positions.create({
            //     ...options,
            //     id: helper.math.generateNumericUUID(),
            //     userId: user.id,
            //     currentPrice: options.amount,
            //     profit: 0
            // });

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
