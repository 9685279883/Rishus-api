const Hr = require("../models/hrModel");
const bcrypt = require('bcrypt'); 
const {generateToken} = require("../config/genrateToken");
const Jwt = require('jsonwebtoken');

exports.hrSignup = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        //  all required fields are provided
        if (!firstname || !lastname || !email || !password ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await Hr.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ message: "User already exists, please diffrent email id" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new HR user
        const hr = new Hr({
            firstname,
            lastname,
            email,
            password: hashedPassword, 
        });

       
        const result = await hr.save();

        return res.status(201).json({ message: "Signup successful", user: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.hrLogin = async (req, res)=>{
    try {
        const {email , password} = req.body;

        const hr = await Hr.findOne({ email : email})
            if(!hr){
                return res.status(400).json({ message : "hr not found"})
            }
            const match = await bcrypt.compare(password, hr.password);

            if (!match) {
                return res.status(400).json({ message: "wrong password" });
              }
              const token = generateToken(hr.email)
              console.log(token)
              return res.status(200).json({ message: "login successfuly", token})
            
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message : "enternal server error", error : error.message})
    }
}








