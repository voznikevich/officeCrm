const helper = require('../../app/helpers/helper');

const lead = {
    get: async (connection, options) => {
        const lead = await connection.Leads.findOne({
            where: {id: options.leadId},
            attributes: {exclude: ['affiliate', 'manager']},
            include: [
                {
                    required: false,
                    model: connection.Affiliates,
                    as: "affiliateData",
                },
                {
                    required: false,
                    model: connection.Users,
                    as: "user",
                    attributes: {exclude: ['password', 'refresh_token']},

                }
            ]
        });

        return {
            success: true,
            result: {
                lead
            }
        };
    },

    all: async (connection, options) => {
        const searchParams = {};

        const leads = await connection.Leads.findAll(
            {
                attributes: {exclude: ['affiliate', 'manager']},
                include: [
                    {
                        required: false,
                        model: connection.Affiliates,
                        as: "affiliateData",
                    },
                    {
                        required: false,
                        model: connection.Users,
                        as: "user",
                        attributes: {exclude: ['password', 'refresh_token']},

                    }
                ],
                limit: options.limit || 10,
                offset: options.page? (options.page  - 1) * options.limit : 0,
                order: [['createdAt', 'DESC']],
            }
        );

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
                message: 'Lead successfully created'
            }
        };
    },

    put: async (connection, options) => {
        await connection.Leads.update({...options}, {
            where: {id: options.leadId},
        })

        return {
            success: true,
            result: {
                message: 'Lead was successfully updated'
            }
        };
    },

    delete: async (connection, options) => {
        await connection.Leads.destroy({where: {id: options.leadId}})

        return {
            success: true,
            result: {message: 'Lead was successfully deleted'}
        };
    }
};

module.exports = lead;
