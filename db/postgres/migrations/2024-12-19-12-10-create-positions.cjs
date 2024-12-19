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
                    model: 'Users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            enterPrice: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            amount: {
                type: Sequelize.INTEGER,
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
                type: Sequelize.STRING,
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
