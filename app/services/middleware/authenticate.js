const jwt = require('jsonwebtoken');
const config = require('../../../config/configRoles');
const repoUser = require('../../repositories/users');

const verifyToken = (req) => {
    let headerToken = req.headers['x-access-token'];
    headerToken = headerToken.split(' ');

    if(headerToken[0] !== 'Bearer'){
        return;
    }

    if(headerToken[1] == undefined){
        return;
    }

    return headerToken[1];
}

const basicAuth = async (req) => {
    let token = verifyToken(req);

    if(!token){
        return;
    }
    let payload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY || "Rahasia");
    try {
        let user = await repoUser.getByID(payload.user);
        return user;
    } catch (error) {
        return;
    }
}

module.exports = {
    async verifyLogin (req){
        if(req.body.username == undefined) {
            return {error: 'User not found'};
        }else if(req.body.username != undefined && req.body.password != undefined){
            return {success: "next"};
        }else{
            return {error: 'User password not match'};
        }
    },
    
    async verifyRegister (req){
        if(req.body.username != '' && req.body.username != undefined && req.body.first_name != '' && req.body.first_name != undefined && req.body.last_name != '' && req.body.last_name != undefined && req.body.email != '' && req.body.email != undefined && req.body.password != '' && req.body.password != undefined){
            let user = await repoUser.findAllParams({
                username : req.body.username,
            });
    
            if(user.length == 0){
                return {success: "next"};
            }else{
                return {error: 'Username has exits'};
            }
        }else{
            return {error: `All collumn can't blank`};
        }
    },

    async userAuth(req){
        try {
            let user = await basicAuth(req);
            if(!user){
                return {error: "Authentication failed"};
            }
            req.user = user;

            return {success: "next"};
        } catch (error) {
            return {error: "Authentication failed", msg: error};
        }
    },

    async adminAuth(req){
        try {
            let user = await basicAuth(req);
            if(!user){
                return {error: "Authentication failed"};
            }
            req.user = user;

            if(user.access_level != 1 && user.access_level != 2){
                return {error: "Authentication rejected. You not an admin"};
            }

            return {success: "next"};
        } catch (error) {
            return {error: "Authentication failed", msg: error};
        }
    },

    async superAuth(req){
        try {
            let user = await basicAuth(req);
            if(!user){
                return {error: "Authentication failed"};
            }
            req.user = user;
            
            if(user.access_level != 2){
                return {error: "Authentication rejected. You not an super admin"};
            }

            return {success: "next"};
        } catch (error) {
            return {error: "Authentication failed", msg: error};
        }
    }
}