const bcrypt = require('bcryptjs');

const helper = require('../../app/helpers/helper');

const auth = {
  registration: async (connection, options) => {
    const candidate = await connection.Users.findOne({
      where: { email: options.email }
    });
    if (candidate) {
      return helper.doom.error.emailAlreadyRegistered();
    }

    const hashPassword = await bcrypt.hash(options.password, 10);

    console.log(options)
    await connection.Users.create({
      ...options,
      password: hashPassword
    });

    return {
      success: true,
      result: {
        message: 'User successfully created'
      }
    };
  },

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
      type: user.type
    });

    user.refresh_token = tokens.refreshToken;
    await user.save();

    return {
      success: true,
      result: { ...tokens, email: user.email, id: user.id }
    };
  }
};

module.exports = auth;
