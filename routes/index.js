'use strict';
const express               = require('express');
const router                = express.Router();
const purchaseorderRoutes   = require('./purchaseorder.routes');
const articleRoutes         = require('./article.routes');
const ingredientRoutes      = require('./ingredient.routes');
const userRoutes            = require('./user.routes');
const roleRoutes            = require('./role.routes');

router.use(userRoutes);
router.use(ingredientRoutes);
router.use(articleRoutes);
router.use(purchaseorderRoutes);
router.use(roleRoutes);

module.exports = router;