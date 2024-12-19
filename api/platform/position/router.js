const {validator, middlewares} = require('../../../app/helpers/helper');
const {schemas} = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');


router.get('/',
    asyncHandler(middlewares.auth.user),
    asyncHandler(controller.get));

router.get(
    '/all',
    validator.main(schemas.router.all),
    // asyncHandler(middlewares.auth.admin),
    asyncHandler(controller.registration)
);

router.post('/',
    asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.post),
    asyncHandler(controller.post)
);

router.put('/',
    // asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.put),
    asyncHandler(controller.putUser)
);

router.delete('/',
    // asyncHandler(middlewares.auth.admin),
    validator.main(schemas.router.delete),
    asyncHandler(controller.deleteUser)
);
module.exports = router;
