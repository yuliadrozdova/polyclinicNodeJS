const jwt = require("jsonwebtoken");
const {secretToken, secretRefToken} = require("../controllers/config");
/**
 * @description authorization middleware
 */
module.exports.auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')
        const decoded = jwt.verify(token, secretToken)
        req.userId = decoded.id;
        next();
    } catch (err) {
        console.error('ERROR: [auth]:', err)
        res.status(401).send('401')
    }
}
