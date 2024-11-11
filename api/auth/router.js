const {validator, middlewares} = require('../../app/helpers/helper');
const {schemas} = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.post(
    '/create-user',
    validator.main(schemas.router.registration),
    asyncHandler(middlewares.auth.admin),
    asyncHandler(controller.registration)
);

router.post('/login', validator.main(schemas.router.login), asyncHandler(controller.login));

module.exports = router;
