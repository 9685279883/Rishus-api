const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const JWT_KEY = process.env.JWT_KEY;

exports.generateToken = (email)=>{


    const payload = {
        email: email

    }

    return jwt.sign(payload, JWT_KEY,{ expiresIn: '1h' })
}



