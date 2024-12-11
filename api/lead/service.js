const helper = require('../../app/helpers/helper');
const {Op} = require("sequelize");
const {Sequelize} = require("../../db/postgres/models");

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

    all: async (connection, options, user) => {
        const dateRange = options.dateRange || [];
        const where = {};

        if (options.status) where.status = options.status;

        if (dateRange.length === 2) {
            where.createdAt = {
                [Op.gte]: dateRange[0],
                [Op.lte]: dateRange[1].split('T')[0].concat('T23:59:59.999Z')
            };
        }

        const limit = options.limit || 10;
        const offset = options.page ? (options.page - 1) * limit : 0;
        const defaultAttributes = {exclude: ['affiliate', 'manager', 'comment']};
        const defaultInclude = [
            {
                required: false,
                model: connection.Comments,
                as: "lastComment",
                attributes: ['id', 'message', 'createdAt']
            },
            {
                required: false,
                model: connection.Users,
                as: "user",
                attributes: {exclude: ['password', 'refresh_token']},
            },
            {
                required: false,
                model: connection.Affiliates,
                as: "affiliateData",
            },
        ];

        if (user.type === 'head' || user.type === 'shift') {
            const {count, rows: leads} = await connection.Leads.findAndCountAll({
                where,
                attributes: defaultAttributes,
                include: defaultInclude,
                limit,
                offset,
                order: [['createdAt', 'DESC']],
            });

            return {
                success: true,
                result: {
                    total: count,
                    totalPages: Math.ceil(count / limit),
                    leads,
                },
            };
        }

        if (user.type === 'teamLead') {
            const users = await connection.Users.findAll({
                where: {
                    group: 1,
                    type: {[Op.or]: ["user", "teamLead"]}
                }
            });

            where.manager = {[Op.in]: users.map(u => u.id)};

            const {count, rows: leads} = await connection.Leads.findAndCountAll({
                where,
                attributes: defaultAttributes,
                include: defaultInclude,
                limit,
                offset,
                order: [['createdAt', 'DESC']],
            });

            return {
                success: true,
                result: {
                    total: count,
                    totalPages: Math.ceil(count / limit),
                    leads,
                },
            };
        }

        if (user.type === 'user') {
            where.manager = user.id;

            const {count, rows: leads} = await connection.Leads.findAndCountAll({
                where,
                attributes: defaultAttributes,
                include: defaultInclude,
                limit,
                offset,
                order: [['createdAt', 'DESC']],
            });

            return {
                success: true,
                result: {
                    total: count,
                    totalPages: Math.ceil(count / limit),
                    leads,
                },
            };
        }

        if (user.type === 'buyer') {
            where.affiliate = options.affiliateId;

            const {count, rows: leads} = await connection.Leads.findAndCountAll({
                where,
                attributes: defaultAttributes,
                include: defaultInclude,
                limit,
                offset,
                order: [['createdAt', 'DESC']],
            });

            return {
                success: true,
                result: {
                    total: count,
                    totalPages: Math.ceil(count / limit),
                    leads,
                },
            };
        }
    },

    post: async (connection, options) => {
        const lead = await connection.Leads.create({
            ...options,
        });

        return {
            success: true,
            result: {
                lead
            }
        };
    },

    put: async (connection, options, user) => {
        const leadId = options.leadId;
        console.log(leadId)
        delete options.leadId;

        if (user.type === 'head' || user.type === 'shift') {
            await connection.Leads.update({...options}, {
                where: {id: leadId},
            })
        }
        if (user.type === 'teamLead' && options.manager) {
            const teamLeadManagers = await connection.Users.findAll({
                where: {group: user.group}
            })
            const isManagerExists = teamLeadManagers.some(managerObj => managerObj.id === options.manager);
            if (isManagerExists) {
                await connection.Leads.update({...options}, {
                    where: {id: leadId},
                })
            }
        }

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
