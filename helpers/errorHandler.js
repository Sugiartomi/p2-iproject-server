function error_handler(error, req, res, next){
    console.log(error);
    if (error.name == "wrong") {
        res.status(400).json({ message: "Invalid email/password" });
    } else if ( error.name == "require") {
        res.status(400).json({message : error.message})
    } else if ( error.name == "SequelizeValidationError" ) {
        res.status(400).json({ message : error.errors[0].message})
    } else if (error.name == "SequelizeUniqueConstraintError") {
        res.status(400).json({ message : `${error.errors[0].path} alredy exixst`})
    } else if( error.name == "no_token" ) {
        res.status(401).json({ message : "please login"})
    } else if( error.name == "forbidden") {
        res.status(403).json({ message : "you dont have permission to access"})
    }
}

module.exports = error_handler