const express = require('express');
const router = express.Router();

const {
    getAllTricks,
    createTrick,
    updateTrick,
    deleteTrick
} = require('../controllers/appointment.controller');

const {auth} = require('../middleware/auth.middleware');

router.get('/allTricks', auth, getAllTricks);
router.post('/createTrick/', auth, createTrick);
router.put('/updateTrick', auth, updateTrick);
router.delete('/deleteTrick/:id', auth, deleteTrick);

module.exports = router;