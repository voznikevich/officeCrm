module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Positions', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                allowNull: false,
            },
            pairId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Pairs',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'PlatformUsers',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            enterPrice: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            amount: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            takeProfit: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            stopLoss: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            type: {
                type: Sequelize.ENUM('sell', 'buy'),
                allowNull: false,
            },
            currentPrice: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            profit: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('Positions');
    },
};
