'use strict';
const express               = require('express');
const router                = express.Router();
const purchaseorderRoutes   = require('./purchaseorder.routes');
const articleRoutes         = require('./article.routes');
const ingredientRoutes      = require('./ingredient.routes');
const userRoutes            = require('./user.routes');
const roleRoutes            = require('./role.routes');

router.use('/user', userRoutes);
router.use('/ingredient', ingredientRoutes);
router.use('/article', articleRoutes);
router.use('/purchaseorder', purchaseorderRoutes);
router.use('/role', roleRoutes);

module.exports = router;