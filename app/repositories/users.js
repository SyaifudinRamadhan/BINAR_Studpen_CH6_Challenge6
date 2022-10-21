const models = require('../models');

module.exports = {
    findAll(){
        return models.User.findAll({
            include: [{ all: true, nested: true }]
        });
    },

    findAllParams(objParams){
        return models.User.findAll({
            where: objParams,
            include: [{ all: true, nested: true }]
        });
    },

    getByID(id){
        return models.User.findOne({
            where: {
                id: id
            },
            include: [{ all: true, nested: true }]
        })
    },

    getByUsername(username){
        return models.User.findAll({
            where: {
                username: username
            },
            include: [{ all: true, nested: true }]
        });
    },

    crreateUser(username, first_name, last_name, email, password, access_level){
        return models.User.create({
            username : username, 
            first_name : first_name, 
            last_name : last_name, 
            email :email, 
            password :password, 
            access_level: access_level ? access_level : 0,
        })
    },

    updateUser(id, username, first_name, last_name, email, access_level){
        return models.User.update({
            username : username, 
            first_name : first_name, 
            last_name : last_name, 
            email :email,
            access_level: access_level
        }, {
            where: {id: id}
        })
    },

    destroyUser(id){
        return models.User.destroy({
            where: {id: id}
        })
    }
}