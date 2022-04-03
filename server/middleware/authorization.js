const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = async(req,res,next) => {
    try {
        
        const jwtToken = req.header("token");

        if(!jwtToken){
            return res.status(403).json("Not Authorized");
        }

        const payLoad = jwt.verify(jwtToken,process.env.jwtSecret);

        req.user = payLoad.user;

        next();

    } catch (error) {
        if(error.message === 'jwt expired'){
            console.error(error.message);
            return res.status(403).json("Session Expired");
        }else{
            console.error(error.message);
            return res.status(403).json("Not Authorized");
        }
    }
}