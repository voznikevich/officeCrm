const {validator, middlewares} = require('../../app/helpers/helper');
const {schemas} = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.get('/', asyncHandler(middlewares.auth.user), asyncHandler(controller.get));

router.post('/',
    validator.main(schemas.router.post),
    asyncHandler(controller.post)
);

router.put('/',
    asyncHandler(middlewares.auth.admin),
    asyncHandler(controller.put)
);

router.delete('/',
    validator.main(schemas.router.deleteUser),
    asyncHandler(controller.delete)
);
module.exports = router;
