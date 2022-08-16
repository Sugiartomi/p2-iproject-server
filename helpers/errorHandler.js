function error_handler(error, req, res, next){
    console.log(error);
    if (error.name == "wrong") {
        res.status(400).json({ message: "Invalid email/password" });
    } else if ( error.name == "require") {
        res.status(400).json({message : error.message})
    }
}

module.exports = error_handler