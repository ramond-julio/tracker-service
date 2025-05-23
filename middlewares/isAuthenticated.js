const jwt = require("jsonwebtoken");

const isAuthenticated = async(req,res,next) => {
    const headerObject = req.headers;
    const token = headerObject?.authorization?.split(' ')[1];
    //verify token
    const verifyToken = jwt.verify(token, 'userKey',(err,decoded) => {
        if(err){
            return false;
        } else {
            return decoded;
        }
    });
    if(verifyToken){
        req.user = verifyToken.id;
        next();
    } else {
        const err = new Error('Token or session expired, login again');
        next(err);
    }
    console.log(token);
    
}

module.exports = isAuthenticated;