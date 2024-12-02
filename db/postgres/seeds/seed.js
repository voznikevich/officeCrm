const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    const adminData = {
      userName: 'admin',
      email: 'voznikevicho@gmail.com',
      created_at: new Date(),
      type: 'head',
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10)
    };

    const existingAdmin = await queryInterface.rawSelect(
      'Users',
      {
        where: { email: adminData.email }
      },
      ['id']
    );

    if (!existingAdmin) {
      await queryInterface.bulkInsert('Users', [adminData], { returning: true });
      console.log('Admin auth created and Page 1 inserted successfully');
    } else {
      console.log('Admin auth already exists');
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', { email: 'voznikevicho@gmail.com' });
  }
};
