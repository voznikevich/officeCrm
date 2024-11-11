const service = require('./service');
const { controller } = require('../../app/helpers/helper');
const { StatusCodes } = require('http-status-codes');

const user = {
  get: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.get(connection, req.user);
      },
      StatusCodes.OK
    );
  },

  logout: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        const refreshToken = req.headers.update.slice(req.headers.update.indexOf('=') + 1);

        return await service.logout(connection, refreshToken);
      },
      StatusCodes.OK
    );
  },

  refresh: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        const refreshToken = req.headers.update.slice(req.headers.update.indexOf('=') + 1);

        return await service.refresh(connection, refreshToken);
      },
      StatusCodes.OK
    );
  }
};

module.exports = user;
