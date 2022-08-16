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
    }
}

module.exports = error_handler