module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('PlatformUsers', 'balance', {
            type: Sequelize.INTEGER,
            allowNull: true,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn('PlatformUsers', 'balance');
    },
};

