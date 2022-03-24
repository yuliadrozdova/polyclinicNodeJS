const jwt = require("jsonwebtoken");
const {secret} = require("../controllers/config");

module.exports.auth = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        let decoded = await jwt.verify(token, secret);
        if(decoded){
            try {
                req.userId = decoded.id;
                await next();
            } catch(err) {console.error('ERROR JWT:', err)}

        }else{
            res.send().status(500);
        }
    }catch (err){res.send().status(403);}
}
