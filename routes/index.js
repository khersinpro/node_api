'use strict';
const express               = require('express');
const router                = express.Router();
const purchaseorderRoutes   = require('./purchaseorder.routes');
const articleRoutes         = require('./article.routes');
const ingredientRoutes      = require('./ingredient.routes');
const userRoutes            = require('./user.routes');
const roleRoutes            = require('./role.routes');
const { guard }             = require('../middleware/auth/auth');

router.use('/user', userRoutes);
router.use('/ingredient', ingredientRoutes);
router.use('/article', articleRoutes);
router.use('/purchaseorder', guard, purchaseorderRoutes);
router.use('/role', guard, roleRoutes);

module.exports = router;