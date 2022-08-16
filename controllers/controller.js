const { User, Report } = require('../models')
const { compPassword } = require('../middleware/bcrypt')
const { createToken, verifyToken } = require('../middleware/jwt')

class Controller {
    static async login(req, res, next) {
        try {
            let { username, password } = req.body
            if(!username || !password) throw { name : "require", message : "email/password required" }

            let find = await User.findOne({ where : { username }})
            if(!find) throw { name : "wrong" }

            let compare = compPassword(password, find.password)
            if(!compare) throw { name: "wrong" };
            
            const payload = find.id
            const access_token = createToken( payload )

            res.status(200).json({access_token})
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller