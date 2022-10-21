const middServices = require('../../../services/middleware/authenticate');

module.exports = {
    verifyLogin(req, res, next){
        middServices.verifyLogin(req).then(result => {
            if(result.error){
                res.status(401).json({error: result.error});
                return;
            }
            next();
        })
    },

    verifyRegister(req, res, next){
        middServices.verifyRegister(req).then(result => {
            if(result.error){
                res.status(401).json({error: result.error});
                return;
            }
            next();
        })
    },

    userAuth(req, res, next){
        middServices.userAuth(req).then(result => {
            if(result.error){
                res.status(401).json({error: result.error});
                return;
            }
            next();
        })
    },

    adminAuth(req, res, next){
        middServices.adminAuth(req).then(result => {
            if(result.error){
                res.status(401).json({error: result.error});
                return;
            }
            next();
        })
    },

    superAuth(req, res, next){
        middServices.superAuth(req).then(result => {
            if(result.error){
                res.status(401).json({error: result.error});
                return;
            }
            next();
        })
    }
}