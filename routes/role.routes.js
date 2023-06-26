'use strict';
const express = require('express');
const router  = express.Router();

// utilisateur
router.get('/'); // getall
router.get('/:id'); // getone

// admin
router.post('/create'); //createone
router.put('/update'); // updateone
router.delete('/delete/:id'); // deleteone

module.exports = router;

