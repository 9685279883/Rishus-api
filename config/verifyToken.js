const Jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const JWT_KEY = process.env.JWT_KEY;
dotenv.config();

exports.verifyToken = (req,res)=>{
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.status(404).json("token not provider")

        }
        const tokenValue = token.split(" ")[1];

            Jwt.verify(tokenValue, JWT_KEY , (err, decode) => {
                    if(err){
                        return res.status(401).json({message : "Authontication failed"})
                    }
                    req.username = decode.userId;
                    
            })
    } catch (error) {
        console.log(error);
    }
}












