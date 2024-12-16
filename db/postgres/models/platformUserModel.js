const Sequelize = require('sequelize');

module.exports = class PlatformUsers extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.BIGINT,
                    primaryKey: true,
                },
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                lastName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                phone: {
                    type: DataTypes.STRING,
                    defaultValue: null
                },
                country: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                lead: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'Leads',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            },
            {
                sequelize,
                timestamps: false,
                freezeTableName: true
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Leads, {
            foreignKey: 'lead',
            as: "leadData"
        });
    }
};
