// express validator
const {body} = require("express-validator");

const validation = [
    body("productname")
        .notEmpty()
        .withMessage("Tienes que ingresar un nombre"),
    body("stock")
        .notEmpty()
        .withMessage("tienes que ingresar el stock disponible"),
    body("description")
        .notEmpty()
        .withMessage("Tienes que ingresar una descripcion"),
    body("price")
        .notEmpty()
        .withMessage("tiene que ingresar un precio"),
    body("category")
        .notEmpty()
        .withMessage("tienes que ingresar una categoria"),
    body("marca")
        .notEmpty()
        .withMessage("tienes que seleccionar una marca"),
    body("image")
    .custom((value, {req})=>{
        let file = req.file;
        if(!file){
            throw new Error ("tienes que ingresar una imagen valida");
        }
        return true;
    })
    
];

module.exports = validation