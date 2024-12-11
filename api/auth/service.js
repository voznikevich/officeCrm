const helper = require('../../app/helpers/helper');
const bcrypt = require("bcryptjs");

const user = {

  login: async (connection, options) => {
    const user = await connection.Users.findOne({
      where: { email: options.email }
    });

    if (!user) {
      return helper.doom.error.wrongEmailOrPassword(options.email);
    }

    const isPasswordsEquals = bcrypt.compareSync(options.password, user.password);
    if (!isPasswordsEquals) {
      return helper.doom.error.wrongEmailOrPassword();
    }

    const tokens = helper.token.generateTokens({
      sub: user.id,
      email: user.email,
      type: user.type,
      group: user.group
    });

    user.refresh_token = tokens.refreshToken;
    await user.save();

    return {
      success: true,
      result: { ...tokens, email: user.email, id: user.id }
    };
  },

  logout: async (connection, refreshToken) => {
    await connection.Users.update(
      { refresh_token: null },
      {
        where: { refresh_token: refreshToken },
        returning: true
      }
    );

    return {
      success: true,
      result: {
        message: 'Logout successfully.'
      }
    };
  },

  refresh: async (connection, refreshToken) => {
    if (!refreshToken) {
      return helper.doom.error.Unauthorized();
    }

    const userData = helper.token.validateRefreshToken(refreshToken);
    const user = await connection.Users.findOne({ where: { refresh_token: refreshToken } });

    if (!userData || !user) {
      return helper.doom.error.Unauthorized();
    }

    const tokens = helper.token.generateTokens({
      sub: user.id,
      email: user.email,
      type: user.type,
      group: user.group
    });

    user.refresh_token = tokens.refreshToken;
    await user.save();

    return {
      success: true,
      result: { ...tokens, email: user.email, id: user.id }
    };
  },

  all: async (connection, options) => {
    let optionsFilter = {};

    if (options.status && options.status !== 'All') {
      optionsFilter.status = options.status;
    }

    if (options.keyword) {
      optionsFilter[Op.or] = [
        { nick_name: { [Op.iLike]: `%${options.keyword}%` } },
        { email: { [Op.iLike]: `%${options.keyword}%` } }
      ];
    }

    const { count, rows: users } = await connection.Users.findAndCountAll({
      where: optionsFilter,
      attributes: { exclude: ['_id', '__v', 'password', 'refresh_token', 'reset_password_link'] },
      limit: 50,
      offset: options.page ? (options.page - 1) * 50 : 0
    });

    return {
      success: true,
      result: {
        users,
        count
      }
    };
  },

  put: async (connection, options) => {
    const user = await connection.Users.findOne({
      where: { id: options.userId }
    });

    if (!user) {
      return helper.doom.error.accountNotFound();
    }

    await user.update(options);

    return {
      success: true,
      result: {
        message: 'User status was successfully updated'
      }
    };
  },

  delete: async (connection, options) => {
    const existingUser = await connection.Users.findOne({ where: { id: options.userId } });

    if (!existingUser) {
      return {
        success: false,
        result: { message: 'User does not exist' }
      };
    }

    const transaction = await connection.sequelize.transaction();

    try {
      await Promise.all([
        connection.Users.destroy({ where: { id: options.userId }, transaction }),
        connection.Wallets.destroy({ where: { user_id: options.userId }, transaction }),
        connection.Pages.destroy({ where: { user_id: options.userId }, transaction })
      ]);

      await transaction.commit();

      return {
        success: true,
        result: { message: 'User was successfully deleted' }
      };
    } catch (error) {
      await transaction.rollback();
      return {
        success: false,
        result: { message: 'Error deleting auth', error: error.message }
      };
    }
  }
};

module.exports = user;
