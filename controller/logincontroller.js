const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = {
    login(req, res){
        const {username, password} = req.body;
        if(!username || !password){
            res.status(400).json({
                msg: "please provide email & password"
            })
        }else{
        const token = jwt.sign({username, password}, process.env.JWT_SECRET_KEY, {expiresIn:"30d"})
        res.status(200).json({
            msg: `user created`,
            token: `${token}`
        })
        }
    },

    dashboard(req, res){
        console.log("req.user---------------->",req.user)
        const luckyNumber = Math.floor(Math.random() * 100);
        res.status(200).json({
            msg : `Hello, ${req.user.username}`,
            secret: `Here is your lucky authorized data, your lucky number is: ${luckyNumber}`
        })
    }
}