'use strict';
const express   = require('express');
const router    = express.Router();
const { guard, isAdmin } = require('../middleware/auth/auth');
const {
    getOne,
    getAll,
    createOne,
    udpateOne,
    deleteOne
}   = require('../controller/ingredient.controller');

/*** UTILISATEUR ***/ 
router.get('/', getAll); 
router.get('/:id', getOne); 

/*** ADMINISTRATEUR ***/
router.post('/create', isAdmin, createOne); 
router.put('/update/:id', isAdmin, udpateOne); 
router.delete('/delete/:id', isAdmin, deleteOne); 

module.exports = router;
