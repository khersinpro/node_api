'use strict';
const express = require('express');
const router  = express.Router();

// utilisateur
router.get('/');
router.get('/:id');

//admin
router.post('/create');
router.put('/update/:id');
router.delete('/delete/:id');

module.exports = router;
