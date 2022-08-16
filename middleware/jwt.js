const jwt = require('jsonwebtoken')
const SK = "iproject"

const createToken = payload => jwt.sign( payload, SK )
const verifyToken = token => jwt.sign( token, SK )

module.exports = { createToken, verifyToken }