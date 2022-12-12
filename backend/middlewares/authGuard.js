const User = require("../models/User")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_PASS;

const authGuard = async (req,res,next) => {

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];
    //BEARE yyuuwlte35658321

    //check if header has token
    if(!token) return res.status(401).json({errors:["Error: AGX01 - Access denied"]})

    //check if token is valid

    try {
        
        const verified = jwt.verify(token,jwtSecret)
        req.user = await User.findById(verified.id).select("-password")
        next()

    } catch (error) {
        res.status(401).json({errors:["Error: AGX02 - Invalid Token"]})
    }


}

module.exports = authGuard;
