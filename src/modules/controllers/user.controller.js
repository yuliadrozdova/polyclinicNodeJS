const User = require("../../db/models/userModel");
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
        res.send({data: result});
    });
}

//create user
module.exports.createUser = (req, res, next) => {
    const {login, password} = req.body;
    const passwordHash = bcrypt.hashSync(password, 7);
    const newUser = new User({login, password: passwordHash});
    newUser.save().then(result => {
        res.send('User created');
        console.log(result);
    }).catch(err => console.log(err))

    console.log('12345')

    const token = generateAT(newUser._id);// не уверена
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
    console.log(password);
    if (!validPas){
        return res.status(400).json({message: "not valid ${user}"})
    }
    const token = generateAT(user._id);
    return res.json({token});
}
