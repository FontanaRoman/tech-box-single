const {body} = require("express-validator");

const validaciones = [
    body("email")
        .notEmpty()
        .withMessage("tienes que ingresar un email")
        .bail()
        .isEmail()
        .withMessage("tienes que ingresar un formato valido de email")
        ,
    body("password")
        .notEmpty()
        .withMessage("tienes que ingresar la contraseña")
];

module.exports = validaciones;