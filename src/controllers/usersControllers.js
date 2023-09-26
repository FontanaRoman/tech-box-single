// libreria fs para leer y escribir json
const fs = require("fs");
// libreria path para realizar direcciones de archivos
const path = require("path");
// datos en formuta json y parseados
const usersJson = path.join(__dirname, "../../data/users.json");
const users = JSON.parse(fs.readFileSync(usersJson, "utf-8"));
// libreria para crear uuid 
const {v4: uuidv4} = require("uuid");
// libreria para encriptar contraseña
const bcrypt = require("bcryptjs");
// validatior Result
const {validationResult} = require("express-validator");

const usersControllers = {
    // renderiza la vista de logueo
    login : function(req,res){
        res.render("login");
    },
    // metodo encargado de la logica del logueo
    loginAunt : function(req,res){

        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){
            return res.render("login",
            {
                errors : resultValidation.mapped(),
                oldData : req.body,
            }
        )}

    },
    // renderiza la vista del formulario para registrarse
    register : function(req,res){
        res.render("register");
    },
    // metodo encargado de la logica para guardar un registro
    resgisterStore : function (req,res){
        let image = "default.jpg";
        if( req.file.filename){
            image = req.file.filename;
        };

        const newUser = {
            id : uuidv4(),
            firstName : req.body.firstname,
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password, 10),
            image : image,
        };
        console.log(newUser);
        users.push(newUser);

        const usersJsonNew = JSON.stringify(users, null, 2);
        fs.writeFileSync(usersJson,usersJsonNew );
        res.redirect("/");
    }
}
module.exports = usersControllers;