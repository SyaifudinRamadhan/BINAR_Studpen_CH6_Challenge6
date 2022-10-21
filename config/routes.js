const express = require("express");
const controllers = require("../app/controllers");
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yaml'));

const apiRouter = express.Router();

apiRouter.post("/api/v1/login", controllers.api.midd.middAuth.verifyLogin, controllers.api.v1.auth.login);
apiRouter.post("/api/v1/register", controllers.api.midd.middAuth.verifyRegister, controllers.api.v1.auth.register);

// Routes untuk user & public
apiRouter.put("/api/v1/update-profile", controllers.api.midd.middAuth.userAuth, controllers.api.v1.auth.updateProfilUser);
apiRouter.get("/api/v1/who-am-i", controllers.api.midd.middAuth.userAuth, controllers.api.v1.auth.whoAmI);
apiRouter.get("/api/v1/cars/:driverType/:date/:time/:countPeople", controllers.api.v1.car.filterPublic);

// Routes untuk admin dan super admin
apiRouter.get("/api/v1/cars", controllers.api.midd.middAuth.adminAuth, controllers.api.v1.car.list);
apiRouter.get("/api/v1/car/:id", controllers.api.midd.middAuth.adminAuth, controllers.api.v1.car.show);
apiRouter.get("/api/v1/car/name/:name", controllers.api.midd.middAuth.adminAuth, controllers.api.v1.car.showName);
apiRouter.get("/api/v1/car/size/:size", controllers.api.midd.middAuth.adminAuth, controllers.api.v1.car.showSize);
apiRouter.post("/api/v1/car/add", controllers.api.midd.middAuth.adminAuth, controllers.api.midd.middCar.upload.single('image'), controllers.api.midd.middCar.setCreate,controllers.api.v1.car.create);
apiRouter.put("/api/v1/car/:id/update", controllers.api.midd.middAuth.adminAuth, controllers.api.midd.middCar.setCar, controllers.api.midd.middCar.upload.single('image'), controllers.api.midd.middCar.setCreate,controllers.api.v1.car.update)
apiRouter.delete("/api/v1/car/:id/delete", controllers.api.midd.middAuth.adminAuth, controllers.api.v1.car.destroy);

// Routes untuk super admin
apiRouter.get("/api/v1/get-users", controllers.api.midd.middAuth.superAuth, controllers.api.v1.auth.listUser);
apiRouter.get("/api/v1/get-user/:id", controllers.api.midd.middAuth.superAuth, controllers.api.v1.auth.getUser);
apiRouter.get("/api/v1/get-admins", controllers.api.midd.middAuth.superAuth, controllers.api.v1.auth.listUsersAdmin);
apiRouter.post("/api/v1/add-admin", controllers.api.midd.middAuth.superAuth, controllers.api.v1.auth.registerAnAdmin);
apiRouter.put("/api/v1/update-profile/:id", controllers.api.midd.middAuth.superAuth, controllers.api.v1.auth.updateProfil);
apiRouter.delete("/api/v1/remove-account/:id", controllers.api.midd.middAuth.superAuth, controllers.api.v1.auth.destroyUser);

apiRouter.use('/api-docs', swaggerUi.serve);
apiRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));

apiRouter.use(express.static(path.join(__dirname, '../bin/public')));
apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
