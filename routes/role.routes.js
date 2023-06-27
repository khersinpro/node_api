'use strict';
const express = require('express');
const router  = express.Router();
const {
    getOne,
    getAll,
    createOne,
    udpateOne,
    deleteOne
}   = require('../controller/roles.controller');

/*** UTILISATEUR ***/ 
router.get('/', getAll); 
router.get('/:id', getOne); 

/*** ADMINISTRATEUR ***/
router.post('/create', createOne); 
router.put('/update', udpateOne); 
router.delete('/delete/:id', deleteOne); 

module.exports = router;

