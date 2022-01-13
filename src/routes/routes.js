const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const {
    getAllUsers,
    createUser,
    loginUser
} = require('../controllers/user.controller');

const {
    getAllTricks,
    createTrick,
    updateTrick,
    deleteTrick
} = require('../controllers/appointment.controller');

const {model} = require("mongoose");
const {secret} = require("../controllers/config");
const {decode} = require("jsonwebtoken");

const auth = async (req, res, next) => {
    const token = req.headers.authorization;

    await console.log('/// ', jwt);
    let decoded = await jwt.verify(token, secret);

    if(token){
         try {
              req.userId = decoded.id;
             await next();
        } catch(err) {
            console.log('err1')
        }
    // }else if(createTrick){
    //     console.log('************')
    //     try {
    //         req.userId = decoded.id;
    //         await next();
    //     } catch(err) {
    //         console.log('err2')
    //     }
    }else{
        res.send().statusCode(500);
    }

   await console.log('token ', token);
    await   console.log(' req.userId ', req.userId);

}

router.get('/hello', (req, res, next) => {
    res.send('HI!')
});
router.get('/allUsers',  getAllUsers);
router.post('/createUser', createUser);
router.post('/loginUser', loginUser);

router.get('/allTricks', auth, getAllTricks);
router.post('/createTrick/', auth, createTrick);
router.put('/updateTrick', auth, updateTrick);
router.delete('/deleteTrick/:id', auth, deleteTrick);


module.exports = router;