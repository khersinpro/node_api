'use strict';
const express   = require('express');
const router    = express.Router();
const { guard } = require('../middleware/auth/auth');
const {
    getOne,
    getAll,
    signup,
    signin,
    udpateOne,
    deleteOne
}   = require('../controller/user.controller');

/*** UTILISATEUR ***/ 
router.get('/', getAll); 
router.get('/:id', getOne); 
router.post('/signup', signup); 
router.post('/signin', signin); 
router.put('/update/:id', guard, udpateOne); 

/*** ADMINISTRATEUR ***/
router.delete('/delete/:id', guard, deleteOne); 

module.exports = router;