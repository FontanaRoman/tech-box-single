// libreria para crear uuid 
const { v4: uuidv4 } = require("uuid");
// libreria para encriptar contraseña
const bcrypt = require("bcryptjs");
// validatior Result
const { validationResult } = require("express-validator");
// modelos
const db = require("../../database/models")

const usersControllers = {

    // renderiza la vista del formulario para registrarse
    register: function (req, res) {
        res.render("register");
    },
    // metodo encargado de la logica para guardar un registro
    registerStore: function (req, res) {

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render("register",
                {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                }
            )
        }

        let imagen = "default.jpg";
        if (req.file && req.file.filename) {
            imagen = req.file.filename;
        };

        db.User.create(
            {
                name: req.body.firstname,
                lastname: req.body.lastName,
                rol: 0,
                image: imagen,
                registerDate: new Date(),
                password: bcrypt.hashSync(req.body.password, 10),
                phone: req.body.phone,
                postalCode: req.body.postalCode,
                address: req.body.address,
                email: req.body.email
            }
        )
            .then(res.redirect("/user/userLogin"))
    },

    // renderiza la vista de logueo
    login: function (req, res) {
        res.render("login");
    },
    // metodo encargado de la logica del logueo
    loginAunt: function (req, res) {

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render("login",
                {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                }
            )
        }

        db.User.findOne({
            where : {email: req.body.email}
        })

            .then(user => {
                console.log(user)
                db.User.findByPk(user.id)

                    .then(user=>{
                        let userToLogin = user

                if (userToLogin) {
                    let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
                    if (userToLogin.email == req.body.email && isOkThePassword == true) {
                        delete userToLogin.password;
                        req.session.UserLogged = userToLogin;
                        if (req.body.recuerdame != undefined) {
                            res.cookie("recordame", userToLogin.email, { maxAge: 60000 })
                        }

                        return res.redirect("/user/profile")
                    }
                    return res.render("login", {
                        errors: {
                            email: {
                                msg: "Las credenciales son invalidas"
                            }
                        }
                    })
                }

                return res.render("login", {
                    errors: {
                        email: {
                            msg: "No se encuentra este email"
                        }
                    }
                })
                    })

            })
    },
    // vista del formulario de edicion
    edit: function (req, res) {
        res.render("editDataUser", { user: req.session.UserLogged })
    },
    // logica para guardar la edicion del usuario
    storeEdit: function (req, res) {

        let imagen = "default.jpg";
        if (req.file && req.file.filename) {
            imagen = req.file.filename;
        };

        db.User.update(
            {
                name: req.body.firstname,
                lastname: req.body.lastName,
                image: imagen,
                phone: req.body.phone,
                postalCode: req.body.postalCode,
                address: req.body.address,
                email: req.body.email
            },
            {
                where: { id: req.session.UserLogged.id }
            }
        )
            .then(res.render("/profile", { user: req.session.UserLogged }))
    },
    // renderizamos la vista del perfil del ususario
    profile: function (req, res) {
        res.render("profile",
            {
                user: req.session.UserLogged
            })
    },
    // metodo encargado del deslogueo
    logout: function (req, res) {
        req.session.destroy();
        return res.redirect("/user/userLogin")
    },

    // API

    // api all User
    allUserApi: (req, res) => {
        db.User.findAll()
            .then((user) => {
                res.json({
                    status: 200,
                    data: user,
                });
            })
    },
    // api total user
    totalUserApi: (req, res) => {
        db.User.findAll()
            .then((users) => {
                res.json({
                    status: 200,
                    data: users.length,
                })
            })
    },
    // api user id
    userIdFind: (req, res) => {
        const id = req.params.id;
        db.User.findByPk(id)
            .then((user) => {
                const dataUser = {
                    name: user.name,
                    lastname: user.lastname,
                    image: user.image,
                    registerDate: user.registerDate,
                    phone: user.phone,
                    postalCode: user.postalCode,
                    address: user.address,
                }
                res.json({
                    status: 200,
                    data: dataUser,
                })
            })
    },
    // last user
    lastUser: (req, res) => {
        db.User.findOne({
            order: [["id", "DESC"]],
        })
        .then((user) => {
    
            if (user) {
                res.json({
                    status: 200,
                    data: user,
                });
            } else {
                res.json({
                    status: 404,
                    message: 'No se encontraron usuarios',
                });
            }
        })
    },
}
module.exports = usersControllers;