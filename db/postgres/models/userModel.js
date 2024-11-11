const Sequelize = require('sequelize');

module.exports = class Users extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        refresh_token: {
          type: DataTypes.STRING,
          defaultValue: null
        },
        group: {
          type: DataTypes.ENUM('sales', 'reten', 'buyer'),
          defaultValue: null
        },
        type: {
          type: DataTypes.ENUM('head', 'shift', 'teamLead', 'user'),
          defaultValue: 'user'
        }
      },
      {
        sequelize,
        timestamps: false,
        freezeTableName: true
      }
    );
  }

  static associate() {}
};
