const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const repoUser = require('../repositories/users');
const config = require('../../config/configRoles');
const carServices = require('./car');
const axios = require('axios');
const salt = 10;
const passwoordWithGoogle = 'very_secret_1012_by_fudin'

const encryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, encryptedPassword) => {
            if (!!err) {
                reject(err);
                return;
            }
            resolve(encryptedPassword);
        })
    })
}

const checkPassword = (password, encryptedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, encryptedPassword, (err, isPassCorect) => {
            if (!!err) {
                reject(err);
                return;
            }
            resolve(isPassCorect);
        })
    })
}

const createToken = (id) => {
    return 'Bearer ' + jwt.sign({ user: id }, process.env.JWT_SIGNATURE_KEY || "Rahasia");
}

module.exports = {
    async registerService(req) {
        try {
            let password = await encryptPassword(req.body.password);

            if (!password) {
                return { error: "Password failed create" };
            }

            let user = await repoUser.crreateUser(
                req.body.username, req.body.first_name, req.body.last_name, req.body.email, password, 0, req.body.googleId
            )
            return { user };
        } catch (error) {
            return { error };
        }
    },

    async registerAnAdminService(req) {
        try {
            let password = await encryptPassword(req.body.password);

            if (!password) {
                return { error: "Password failed create" };
            }

            let user = await repoUser.crreateUser(
                req.body.username, req.body.first_name, req.body.last_name, req.body.email, password, 1, req.body.googleId
            )
            return { user };
        } catch (error) {
            return { error };
        }
    },

    async listUserService() {
        try {
            let users = await repoUser.findAll();
            return { users };
        } catch (error) {
            return { error };
        }
    },

    async getUserService(req) {
        try {
            let user = await repoUser.getByID(req.params.id);
            return { user };
        } catch (error) {
            return { error };
        }
    },

    async listUsersAdminService() {
        try {
            let users = await repoUser.findAllParams({
                access_level: 1
            });
            return { users };
        } catch (error) {
            return { error };
        }
    },

    async loginService(req, withGoogle = false) {
        try {
            let user = withGoogle ? await repoUser.getByEmail(req.body.email, req.body.googleId) : await repoUser.getByUsername(req.body.username);
            if (user.length == 0) {
                return { error: 'User not found' };
            }
            //  console.log(user[0].id);
            let isPassCorrect = await checkPassword(req.body.password, user[0].password);

            if (!isPassCorrect) {
                return { error: 'Password is incorrect' };
            }
            // console.log(createToken('uyysdgfusdhfidhfvusdd8hefu'));
            let token = createToken(user[0].id);
            // console.log(token);
            return { user: user[0], token };

        } catch (error) {
            return { error };
        }
    },

    async loginWithGoogle(req) {
        try {
            req.body.password = passwoordWithGoogle;
            let user = await this.loginService(req, withGoogle = true);
            const options = { headers: { Authorization: `Bearer ${req.body.googleToken}` } };
            if (user.error) {
                // Lakukan register akun dengan google
                // req body wajib : first_name, last_name, username, password, email, googleId
                console.log('User error ada');
                let newUser = await this.registerService(req);
                if (newUser.error) {
                    console.log(newUser.error);
                    return { error: newUser.error };
                } else {
                    console.log(newUser);
                    user = await this.loginService(req, withGoogle = true);
                    console.log(user);
                    return user;
                }
                console.log('User error ada 2');
            } else {
                console.log('User error atidak ada');
                // req body wajib : first_name, last_name, username, password, email, googleId, google jwt
                // cek token dengan axios
                const userGoogle = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo",
                    options
                )

                let { id, email } = userGoogle.data;
                // cek google id adalah sesuai token
                if (id !== user.user.googleId || email !== user.user.email) {
                    req.body.googleId = id;
                    req.body.email = email;
                    let newUser = await this.registerService(req);
                    if (newUser.error) {
                        console.log(newUser);
                        user = await this.loginService(req, withGoogle = true);
                        console.log(user);
                        return user;
                    } else {
                        console.log(newUser.error);
                        return { error: newUser.error };
                    }
                }
                // return hasil login
                console.log(user);
                return user;
            }
        } catch (error) {
            return { error }
        }
    },

    async updateProfilService(id, req) {
        try {
            let update = await repoUser.updateUser(id, req.body.username, req.body.first_name, req.body.last_name, req.body.email, req.body.access_level);
            return { success: `Update user successfully`, update };
        } catch (error) {
            return { error };
        }
    },

    async destroyUserService(req) {
        if (req.params.id != req.user.id) {
            try {
                let destroy = await repoUser.destroyUser(req.params.id);

                if (parseInt(destroy) > 0) {
                    let cars = await carServices.listByUser(req.params.id);
                    for (let i = 0; i < cars.data.length; i++) {
                        carServices.delete(cars.data[i].id);
                    }
                }
                return { success: `Delete user successfully`, destroy };
            } catch (error) {
                return { error };
            }
        } else {
            return { error: "Cannot delete your self account" };
        }
    }
}