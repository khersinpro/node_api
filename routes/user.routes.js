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
    deleteOne,
    getUserConnected,
    logout
}   = require('../controller/user.controller');

/*** UTILISATEUR ***/ 
router.get('/', getAll); 
router.post('/signup', signup); 
router.post('/signin', signin); 
router.get('/logout', guard, logout);
router.get('/check', guard, getUserConnected);
router.put('/update/:id', guard, udpateOne); 
router.get('/:id', getOne); 

/*** ADMINISTRATEUR ***/
router.delete('/delete/:id', guard, deleteOne); 

module.exports = router;