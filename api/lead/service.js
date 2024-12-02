const helper = require('../../app/helpers/helper');

const lead = {
    get: async (connection, user) => {
        const leads = await connection.Leads.findAll({
        });

        return {
            success: true,
            result: {
                leads
            }
        };
    },

    post: async (connection, options) => {
        await connection.Leads.create({
            ...options,
        });

        return {
            success: true,
            result: {
                message: 'Leads successfully created'
            }
        };
    },

    put: async (connection, options) => {


        return {
            success: true,
            result: {
                message: 'User was successfully updated'
            }
        };

    },

    deleteUser: async (connection, options) => {
        const existingUser = await connection.Users.findOne({where: {id: options.userId}});

        if (!existingUser) {
            return {
                success: false,
                result: {message: 'User does not exist'}
            };
        }

        await connection.Users.destroy({where: {id: options.userId}})

        return {
            success: true,
            result: {message: 'User was successfully deleted'}
        };

    }
};

module.exports = lead;
