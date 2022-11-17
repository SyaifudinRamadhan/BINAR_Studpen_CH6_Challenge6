const carServices = require("../../../services/car");

module.exports = {
    // untuk super admiin
    filterPublic(req, res) {
        carServices.publicFilter(req).then((result) => {
            res.status(200).json({
                status: "OK",
                cars: result
            })
        }).catch((err)=>{
            res.status(400).json({
                status: "FAIL",
                message: err,
            });
        })
    },

    list(req, res) {
        carServices
            .list(req)
            .then((data, count) => {
                res.status(count == 0 ? 404 : 200).json({
                    status: "OK",
                    cars: count == 0 ? "Data not found" : data,
                    total: count,
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    },
    // untuk super dan admin
    create(req, res) {
        carServices
            .create(req)
            .then((post) => {
                res.status(201).json({
                    status: "OK",
                    data: post,
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status: "FAIL",
                    message: err,
                });
            });
    },
    // untuk super dan admin
    update(req, res) {
        carServices
            .update(req)
            .then((result) => {
                res.status(result == null || result == '' || result == undefined ? 404 : 200).json({
                    status: "OK",
                    data: result == null || result == '' || result == undefined ? "Data not found" : result,
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status: "FAIL",
                    message: err,
                });
            });
    },
    // untuk super admin
    show(req, res) {
        carServices
            .get(req)
            .then((data) => {
                res.status(data == null || data == '' || data == undefined ? 404 : 200).json({
                    status: "OK",
                    car: data == null || data == '' || data == undefined ? "Data not found" : data,
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    },
    // untuk super admin
    showSize(req, res) {
        carServices
            .getSize(req)
            .then((data) => {
                res.status(data == null || data == '' || data == undefined ? 404 : 200).json({
                    status: "OK",
                    car: data == null || data == '' || data == undefined ? "Data not found" : data,
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    },
    
    // untuk super admin
    showName(req, res) {
        carServices
            .getName(req)
            .then((data) => {
                res.status(data == null || data == '' || data == undefined ? 404 : 200).json({
                    status: "OK",
                    car: data == null || data == '' || data == undefined ? "Data not found" : data,
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    },
    
    // untuk super admin
    destroy(req, res) {
        carServices
            .delete(req)
            .then((deleted) => {
                res.status(deleted == 0 ? 404 : 202).json({
                    status: "OK",
                    message: deleted == 0 ? `Data with id ${req.params.id} not found` : `Data with id ${req.params.id} deleted success`
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    },
    
};
