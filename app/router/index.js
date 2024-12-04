const auth = require('../../api/auth/router');
const user = require('../../api/user/router');
const lead = require('../../api/lead/router');
const affiliate = require('../../api/affiliate/router');
const group = require('../../api/group/router');
const comment = require('../../api/comment/router');

module.exports = {
    api: (app) => {
        app.use('/user', user);
        app.use('/auth', auth);
        app.use('/lead', lead);
        app.use('/affiliate', affiliate);
        app.use('/group', group);
        app.use('/comment', comment);
    }
};
