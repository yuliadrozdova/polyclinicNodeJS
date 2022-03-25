const jwt = require("jsonwebtoken");
const {secretToken, secretRefToken} = require("./config");
/**
 * @description generate random access & refresh tokens
 */
module.exports.genAccessToken = (id) =>{
    const payload = { id };
    const token = jwt.sign(payload, secretToken, {expiresIn: "24h"});
    const refToken = jwt.sign(payload, secretRefToken, {expiresIn: '30d'})
    return {token, refToken}
}