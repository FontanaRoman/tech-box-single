const {body} = require("express-validator");

const validation = [
    body("firstname")
        .notEmpty()
        .withMessage("tienes que ingresar un nombre de ususario"),
    body("lastName")
        .notEmpty()
        .withMessage("tienes que ingresar un apellido"),
    body("email")
        .notEmpty()
        .withMessage("tienes que ingresar un email valido")
        .bail()
        .isEmail()
        .withMessage("tienes que ingresar un email valido"),
    body("password")
        .notEmpty()
        .withMessage("tienes que ingresar una contraseña")
        .bail()
        .isLength({min : 5})
        .withMessage("la contraseña debe tener minimo 5 caracteres"),
    body("phone")
        .notEmpty()
        .withMessage("tienen que ingresar un numero de contacto"),
    body("postalCode")
        .notEmpty()
        .withMessage("tienes que ingresar el codigo postal de tu ciudad")
        .bail()
        .isLength({min : 4})
        .withMessage("codigo postal invalido"),
    body("address")
        .notEmpty()
        .withMessage("tienes que ingresar una direccion"),
]

module.exports = validation;