'use strict';
const express = require('express');
const router  = express.Router();

router.post('/signup');
router.post('/signin');
router.get('/logout');
router.get('/:id');
router.get('/');

module.exports = router;