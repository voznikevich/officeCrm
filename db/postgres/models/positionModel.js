const Sequelize = require('sequelize');
module.exports = class Positions extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.BIGINT,
                    primaryKey: true,
                    allowNull: false,
                },
                pairId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'Pairs',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'PlatformUsers',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                enterPrice: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                amount: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                takeProfit: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                stopLoss: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                type: {
                    type: DataTypes.ENUM('sell', 'buy'),
                    allowNull: false,
                },
                currentPrice: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                profit: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
            },
            {
                sequelize,
                timestamps: true,
                freezeTableName: true,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Pairs, {
            foreignKey: 'pairId',
            as: "pair"
        });
        this.belongsTo(models.Users, {
            foreignKey: 'userId',
            as: "user"
        });
    }
};
