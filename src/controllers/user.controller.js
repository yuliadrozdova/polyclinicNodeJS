const User = require("../db/models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {genAccessToken} = require("./genAccessToken");
const {secretToken, secretRefToken} = require("./config");

/**
 * { GET } /all users
 * @description get all users
 */
module.exports.getAllUsers = (req, res, next) => {
    User.find().then(result => {
        res.send({data: result}).status(200);
    });
}

/**
 * { POST } /createUser
 * @description create user
 */
module.exports.createUser = async (req, res, next) => {
    const {login, password} = req.body;
    const user = await User.findOne({login});

    if (user){
        return res.status(401).json({message: "user ${user} already exists"})
    }
    if ((login === '' || password === '') || (login === '' && password === '')) {
        return res.status(401).json({message: "not valid ${user}"})
    }

    const passwordHash = bcrypt.hashSync(password, 7);
    const newUser = new User({login, password: passwordHash});
    newUser.save().then(result => {
        res.send('User created').status(200);
    }).catch(err => console.error('ERROR CREATE USER:', err))
    const token = genAccessToken(newUser._id);
    return res.json(token);
}

/**
 * { POST } /loginUser
 * @description login user
 */
module.exports.loginUser = async (req, res, next) => {
    const {login, password} = req.body;
    const user = await User.findOne({login});
    if (!user){
        return res.status(401).json({message: "user ${user} not found"})
    }
    const validPas = bcrypt.compareSync(password, user.password);
    if (!validPas){
        return res.status(401).json({message: "not valid ${user}"})
    }
    const token = genAccessToken(user._id);
    return res.json(token);
}

/**
 * { POST } /refreshToken
 * @description refresh token
 */
module.exports.refreshToken = async (req, res, next) => {
    const refToken = req.headers.authorization;
    if(!refToken){
        return res.status(403).send();
    }
    try {
        const decoded = jwt.verify(refToken, secretRefToken)
        const refreshToken = genAccessToken(decoded._id);
        res.status(200).send(refreshToken);
    } catch (err) {
        console.error('ERROR REFRESH TOKEN:', err)
        res.status(401).send(err);
    }
}