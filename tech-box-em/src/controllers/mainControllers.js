const db = require("../../database/models");

const mainControllers = {
    index : function(req,res){
        db.Product.findAll()
            .then(productos=>{
                res.render("index", {productos : productos});
            })
    }
}

module.exports = mainControllers;