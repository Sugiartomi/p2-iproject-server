let Authorization = (req, res, next) =>{
    console.log(req.user.role);
    if( req.user.role == "admin" ) next()
    else throw { name : "forbidden" }
}

module.exports = Authorization