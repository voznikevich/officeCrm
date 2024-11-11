const { validator, middlewares } = require('../../app/helpers/helper');
const { schemas } = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.get('/', asyncHandler(middlewares.auth.user), asyncHandler(controller.get));

router.post('/logout', asyncHandler(controller.logout));

router.post('/refresh', asyncHandler(controller.refresh));

module.exports = router;
