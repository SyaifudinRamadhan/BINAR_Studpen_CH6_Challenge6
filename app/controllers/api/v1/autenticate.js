const authServices = require('../../../services/authenticate');

module.exports = {
     register (req, res) {
        authServices.registerService(req).then(result => {
            if(result.error){
                res.status(400).json({error: result.error});
                return;
            }
            res.status(201).json({user: result.user});
        })
    },

     registerAnAdmin (req, res) {
        authServices.registerAnAdminService(req).then(result => {
            if(result.error){
                res.status(400).json({error: result.error});
                return;
            }
            res.status(201).json({user: result.user});
        })
    },

     listUser (req, res) {
        authServices.listUserService().then(result => {
            if(result.error){
                res.status(400).json({error: result.error});
                return;
            }
            res.status(200).json({users: result.users});
            return;
        })
    },

    getUser(req, res){
        authServices.getUserService(req).then(result => {
            if(result.error){
                res.status(400).json({error: result.error});
                return;
            }
            res.status(200).json({user: result.user});
            return;
        })
    },

    listUsersAdmin(req, res){
        authServices.listUsersAdminService().then(result => {
            console.log(result);
            if(result.error){
                res.status(400).json({error: result.error});
                return;
            }
            res.status(200).json({users: result.users});
            return;
        })
    },

     login (req, res) {
        authServices.loginService(req).then(result => {
            if(result.error){
                res.status(404).json({error: result.error});
                return;
            }
            res.status(200).json({users: result.user, token: result.token});
            return;
        })
    },

     updateProfilUser (req, res){
        let user = req.user;
        req.body.access_level = user.access_level;
        authServices.updateProfilService(user.id, req).then(result => {
            if(result.error){
                res.status(404).json({error: result.error});
                return;
            }
            res.status(200).json(result);
            return;
        })
    },

    updateProfil (req, res){
        authServices.updateProfilService(req.params.id, req).then(result => {
            if(result.error){
                res.status(404).json({error: result.error});
                return;
            }
            res.status(200).json(result);
            return;
        })
    },

     destroyUser(req, res){
        authServices.destroyUserService(req).then(result => {
            if(result.error){
                res.status(404).json({error: result.error});
                return;
            }
            res.status(200).json(result);
            return;
        })
    },

    whoAmI(req, res){
        res.status(200).json({user: req.user});
    }
}