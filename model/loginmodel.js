const dbConnector = require('../middleware/dbconnection');

module.exports = {
    getLoginUser(userObj){
        return dbConnector.query(`select * from login_master where username = '${userObj.username}'`);
    },

    getLoginUser1(userObj){
        return dbConnector.query(`select * from login_master where username = '${userObj.username}'`);
    }
}