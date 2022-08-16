const { verifyToken } = require("../middleware/jwt");

let Authentification = async (req, res, next) => {
  let { access_token } = req.headers;
  if (!access_token) throw { name: "no_token" };

  let verify = verifyToken(access_token)
  console.log(verify);
};


module.exports = Authentification