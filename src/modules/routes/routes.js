const express = require('express');
const router = express.Router();

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

router.get('/hello', (req, res, next) => {
    res.send('HI!')
});
router.get('/allUsers', getAllUsers);
router.post('/createUser', createUser);
router.post('/loginUser', loginUser);

router.get('/allTricks', getAllTricks);
router.post('/createTrick', createTrick);
router.put('/updateTrick', updateTrick);
router.delete('/deleteTrick', deleteTrick);







module.exports = router;