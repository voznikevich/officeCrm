const helper = require('../../app/helpers/helper');

const affiliate = {
    get: async (connection, user) => {
        const userData = await connection.Users.findOne({
            where: {id: user.id},
            attributes: {exclude: ['password', 'refresh_token', 'createdAt', 'updatedAt']}
        });

        return {
            success: true,
            result: {
                user: userData
            }
        };
    },

    post: async (connection, options) => {
        await connection.Groups.create({
            ...options,
        });

        return {
            success: true,
            result: {
                message: 'Group successfully created'
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

module.exports = affiliate;
