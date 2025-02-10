const jwt = require('jsonwebtoken')
require('dotenv').config();
const loginModel = require('../model/loginmodel');

module.exports = {
    login(req, res){
        console.log(req.body)
        const {username, password} = req.body;
        if(!username || !password){
            res.status(400).json({
                msg: "please provide email & password"
            })
        }else{
        loginModel.getLoginUser({username, password}).then((result)=>{
            result = result.rows;
            if(result.length){
            const token = jwt.sign({username, password}, process.env.JWT_SECRET_KEY, {expiresIn:"30d"})
            res.status(200).json({
                token: `${token}`
            })

            }else{
                res.status(200).json({
                    msg : `No User Found Please Contact Admin`
                })
            }
            
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