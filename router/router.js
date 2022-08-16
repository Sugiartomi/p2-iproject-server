const router = require('express').Router()
const Controller = require("../controllers/controller");

router.get("/login", Controller.login)

module.exports = router