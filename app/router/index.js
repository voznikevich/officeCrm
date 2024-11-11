const auth = require('../../api/auth/router');
const user = require('../../api/user/router');

module.exports = {
  api: (app) => {
    app.use('/auth', auth);
    app.use('/user', user);
  }
};
