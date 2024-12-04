const jwt = require('jsonwebtoken')

module.exports = {
    authenticationMiddleWare(req, res, next){
        const authHeader = req.headers.authorization;
        if(authHeader && authHeader.startsWith('Bearer ')){
        const token = authHeader.split(' ')[1];
        console.log(token)
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const {username, password} = decode;
            req.user = {username, password};
            next();
        }catch(error){
            res.status(401).json({
                msg : `Not authorize to access this route`
            })
        }

        }else{
            res.status(500).json({
                msg : `Authorization Failed`
            })
        }
        
    }
}