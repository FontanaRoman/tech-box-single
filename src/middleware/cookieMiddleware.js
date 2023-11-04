const db = require("../../database/models")
function cookie(req,res,next){
    if(req.cookies.recordame != undefined && req.session.UserLogged == undefined){
        db.User.findOne(
            {
                email : req.body.recuerdame,
            }
        )
            .then(user=>{
                req.session.UserLogged = user;
            })
    }
    next()
}

module.exports = cookie;