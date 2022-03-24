const User = require("../db/models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {secret} = require("./config");

const generateAT = (id) =>{
    const payload = { id };
    return jwt.sign(payload, secret, {expiresIn: "24h"});
}


//get all users
module.exports.getAllUsers = (req, res, next) => {
    User.find().then(result => {
        res.send({data: result}).status(200);
    });
}

//create user
module.exports.createUser = async (req, res, next) => {
    const {login, password} = req.body;
    const user = await User.findOne({login});

    if (user){
        return res.status(400).json({message: "user ${user} already exists"})
    }
    if ((login === '' || password === '') || (login === '' && password === '')) {
        return res.status(400).json({message: "not valid ${user}"})
    }

    const passwordHash = bcrypt.hashSync(password, 7);
    const newUser = new User({login, password: passwordHash});
    newUser.save().then(result => {
        res.send('User created').status(200);
    }).catch(err => console.error('ERROR CREATE USER:', err))

    const token = generateAT(newUser._id); // не уверена
    return res.json({token});

}

//login User
module.exports.loginUser = async (req, res, next) => {
    const {login, password} = req.body;
    const user = await User.findOne({login});

    if (!user){
        return res.status(400).json({message: "user ${user} not found"})
    }

    const validPas = bcrypt.compareSync(password, user.password);
    // console.log(password);
    if (!validPas){
        return res.status(400).json({message: "not valid ${user}"})
    }
    const token = generateAT(user._id);
    // console.log('token', token)
    return res.json({token});
}

//refresh token
module.exports.refreshToken = async (req, res, next) => {
    // console.log('0000')

    if(req.headers.authorization === undefined ||
        req.headers.authorization === "undefined"){
        return;
    }

    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, 'refToken123')
        const refreshToken = generateAT(decoded._id);
        res.send(refreshToken).status(200);
    } catch (err) {
        res.send(err).status(400);
    }
}

