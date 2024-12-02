const service = require('./service');
const {controller} = require('../../app/helpers/helper');
const {StatusCodes} = require('http-status-codes');

const group = {
    get: async (req, res) => {
        await controller.sendJson(
            res,
            async (connection) => {
                return await service.get(connection, req.user);
            },
            StatusCodes.OK
        );
    },

    post: async (req, res) => {
        await controller.sendJson(
            res,
            async (connection) => {
                return await service.post(connection, req.options);
            },
            StatusCodes.OK
        );
    },

    put: async (req, res) => {
        await controller.sendJson(
            res,
            async (connection) => {
                return await service.put(connection, req.options);
            },
            StatusCodes.OK
        );
    },

    delete: async (req, res) => {
        await controller.sendJson(
            res,
            async (connection) => {
                return await service.delete(connection, req.options);
            },
            StatusCodes.OK
        );
    }


};

module.exports = group;
