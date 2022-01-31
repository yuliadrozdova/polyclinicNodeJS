const jwt = require("jsonwebtoken");
const {secret} = require("../controllers/config");

module.exports.auth = async (req, res, next) => {
    const token = req.headers.authorization;

    let decoded = await jwt.verify(token, secret);
    console.log('decoded ', decoded);

    if(decoded){
        try {
            req.userId = decoded.id;
            await next();
        } catch(err) {
            console.log('err1')
        }

    }else{
        res.send().status(500);
    }
}
