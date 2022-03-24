const express = require('express');
const router = express.Router();


const {
    getAllUsers,
    createUser,
    loginUser,
    refreshToken
} = require('../controllers/user.controller');

const {
    getAllTricks,
    createTrick,
    updateTrick,
    deleteTrick
} = require('../controllers/appointment.controller');

const {
    auth
} = require('../controllers/auth.controller');


router.get('/hello', (req, res, next) => {
    res.send('HI!')
});
router.get('/allUsers',  getAllUsers);
router.post('/createUser', createUser);
router.post('/loginUser', loginUser);
router.post('/refreshToken', refreshToken);

router.get('/allTricks', auth, getAllTricks);
router.post('/createTrick/', auth, createTrick);
router.put('/updateTrick', auth, updateTrick);
router.delete('/deleteTrick/:id', auth, deleteTrick);


module.exports = router;