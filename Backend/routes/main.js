const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const{check,body} =require('express-validator');
const isAuth=require('../middleware/setReq');

router.post('/validateBracket',userController.validBrackets);

router.post('/admin/modifyBracket',userController.modifyBrackets);

router.post('/checkToken',isAuth,userController.checkToken);

router.post('/login',userController.login);

router.post('/signup',userController.signup);


module.exports = router;

