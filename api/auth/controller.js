const service = require('./service');
const { controller } = require('../../app/helpers/helper');
const { StatusCodes } = require('http-status-codes');

const auth = {
  registration: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.registration(connection, req.options);
      },
      StatusCodes.OK
    );
  },

  login: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.login(connection, req.options);
      },
      StatusCodes.OK
    );
  }
};

module.exports = auth;
