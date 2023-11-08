function authMiddleware (req,res,next){
    if(req.session.UserLogged.rol == 0){
        return res.redirect("/products")
    }
    next()
}

module.exports = authMiddleware;