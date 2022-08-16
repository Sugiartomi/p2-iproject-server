const router = require('express').Router()
const Controller = require("../controllers/controller");
const Authentification = require("../helpers/Authentification");

router.post("/login", Controller.login)
router.post("/register", Controller.register)

// Authentification
router.use(Authentification)

router.get("/report", Controller.fetchReport)


module.exports = router