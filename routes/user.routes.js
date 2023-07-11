'use strict';
const express   = require('express');
const router    = express.Router();
const { guard, isAdmin } = require('../middleware/auth/auth');
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
router.get('/', isAdmin, getAll); 
router.post('/signup', signup); 
router.post('/signin', signin); 
router.get('/logout', guard, logout);
router.get('/check', guard, getUserConnected);
router.put('/update/:id', guard, udpateOne); 
router.get('/:id', getOne); 

/*** ADMINISTRATEUR ***/
router.delete('/delete/:id', isAdmin, deleteOne); 

module.exports = router;