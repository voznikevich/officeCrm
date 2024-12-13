const auth = require('../../api/crm/auth/router');
const user = require('../../api/crm/user/router');
const lead = require('../../api/crm/lead/router');
const affiliate = require('../../api/crm/affiliate/router');
const group = require('../../api/crm/group/router');
const comment = require('../../api/crm/comment/router');

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
