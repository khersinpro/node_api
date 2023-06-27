'use strict';
const express   = require('express');
const router    = express.Router();
const { guard } = require('../middleware/auth/auth');
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
router.post('/create', guard, createOne); 
router.put('/update', guard, udpateOne); 
router.delete('/delete/:id', guard, deleteOne); 

module.exports = router;
