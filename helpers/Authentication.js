const { verifyToken } = require("../middleware/jwt");

let Authentication =  (req, res, next) => {
try {
      let { access_token } = req.headers;
      if (!access_token) throw { name: "no_token" };

      let verify =  verifyToken(access_token);
      if (!verify) throw { name: "no_token" };

      req.user = {
        id: verify.id,
        username: verify.username,
        role: verify.role,
      };

      next();
} catch (error) {
    next(error)
}
};


module.exports = Authentication