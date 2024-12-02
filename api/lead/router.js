const {validator, middlewares} = require('../../app/helpers/helper');
const {schemas} = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.get('/',
    // asyncHandler(middlewares.auth.user),
    asyncHandler(controller.get));

router.post('/',
    validator.main(schemas.router.post),
    // asyncHandler(middlewares.auth.user),
    asyncHandler(controller.post)
);

router.put('/',
    asyncHandler(middlewares.auth.admin),
    // validator.main(schemas.router.putUser),
    asyncHandler(controller.put)
);

router.delete('/',
    // asyncHandler(middlewares.auth.admin),
    validator.main(schemas.router.deleteUser),
    asyncHandler(controller.delete)
);
module.exports = router;
