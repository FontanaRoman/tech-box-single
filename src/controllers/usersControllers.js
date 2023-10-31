// libreria para crear uuid 
const {v4: uuidv4} = require("uuid");
// libreria para encriptar contraseña
const bcrypt = require("bcryptjs");
// validatior Result
const {validationResult} = require("express-validator");
// modelos
const db = require("../../database/models")

const usersControllers = {

    // renderiza la vista del formulario para registrarse
    register : function(req,res){
        res.render("register");
    },
    // metodo encargado de la logica para guardar un registro
    registerStore : function (req,res){

        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){
            return res.render("register",
                {
                    errors : resultValidation.mapped(),
                    oldData : req.body,
                }
            )}

        let imagen = "default.jpg";
        if (req.file && req.file.filename) {
            imagen = req.file.filename;
        };

        db.User.create(
            {
                name : req.body.firstname,
                lastname : req.body.lastName,
                rol : 1,
                image : imagen,
                registerDate : new Date(),
                password : bcrypt.hashSync(req.body.password, 10),
                phone : req.body.phone,
                postalCode : req.body.postalCode,
                address : req.body.address,
                email : req.body.email
            }
        )
            .then(res.redirect("/user/userLogin"))
    },

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

            db.User.findOne({
                email : req.body.email
            })

            .then(user=>{
                let userToLogin = user

                if(userToLogin){
                    let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
                    if(isOkThePassword){
                        delete userToLogin.password;
                        req.session.UserLogged = userToLogin;
                        return res.redirect("/user/profile")
                    }
                    return res.render("login",{
                        errors : {
                            email : {
                                msg : "Las credenciales son invalidas"
                            }
                        }
                    })
                }
    
                return res.render("login",{
                    errors : {
                        email : {
                            msg : "No se encuentra este email"
                        }
                    }
                })
            })
    },
    edit : function(req,res){
        res.render("editDataUser", {user : req.session.UserLogged})
    },
    storeEdit : function(req,res){

        let imagen = "default.jpg";
        if (req.file && req.file.filename) {
            imagen = req.file.filename;
        };

      db.User.update(
        {
            name : req.body.firstname,
            lastname : req.body.lastName,
            image : imagen,
            phone : req.body.phone,
            postalCode : req.body.postalCode,
            address : req.body.address,
            email : req.body.email
        },
        {
            where : { id : req.session.UserLogged.id }
        }
      ) 
        .then(res.render("/profile",{user : req.session.UserLogged}))
    },
    // renderizamos la vista del perfil del ususario
    profile : function(req,res){
        res.render("profile", 
        {
            user : req.session.UserLogged
        })
    },
    // metodo encargado del deslogueo
    logout : function(req,res){
        req.session.destroy();
        return res.redirect("/user/userLogin")
    },    
}
module.exports = usersControllers;