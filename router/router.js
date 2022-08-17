const router = require('express').Router()
const Controller = require("../controllers/controller");
const Authentication = require("../helpers/Authentication");
const Authorization = require('../helpers/Authorization')

router.post("/login", Controller.login)
router.post("/register", Controller.register)

// Authentification
router.use(Authentication)

router.get("/report", Controller.fetchReport)
router.get("/report/:id", Controller.fetchReportById);
router.post("/report", Controller.createReport)

// Authorization
router.patch("/report/:id", Authorization, Controller.changeStatus);


module.exports = router