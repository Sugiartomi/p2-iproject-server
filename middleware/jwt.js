const jwt = require('jsonwebtoken')
const SK = process.env.SK

const createToken = payload => jwt.sign( payload, SK )
const verifyToken = token => jwt.verify( token, SK )

module.exports = { createToken, verifyToken }