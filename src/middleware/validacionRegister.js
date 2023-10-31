const {body} = require("express-validator");

const validation = [
    body("firstname").notEmpty().withMessage("tienes que ingresar un nombre de ususario"),
    body("email").notEmpty().withMessage("tienes que ingresar un email valido"),
    body("password").notEmpty().withMessage("tienes que ingresar una contraseña"),
    body("lastName").notEmpty().withMessage("tenes que ingresar un apellido"),
    body("phone").notEmpty().withMessage("tienen que ingresar un numero"),
    body("postalCode").notEmpty().withMessage("tienes que ingresar un codigo postal"),
    body("address").notEmpty().withMessage("tienes que ingresar una direccion"),
]

module.exports = validation;