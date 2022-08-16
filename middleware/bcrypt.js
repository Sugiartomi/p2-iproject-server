const bcrypt = require('bcryptjs')
const unique = 10

const hashPassword = pass => bcrypt.hashSync(pass, unique)
const compPassword = (pass, hash) => bcrypt.compareSync(pass, hash)

module.exports = {hashPassword, compPassword}