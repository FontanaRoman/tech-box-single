const express = require("express");
const router = express.Router();
const db = require('../../database/models');


router.get("/TITO", function (req, res) {
    db.User.findAll()
        .then(User => {
            res.json(User);
        })
});

module.exports = router

//? RUTA DE DEVELOPER, NO HACERLE DEPLOY PERO TAMPOCO QUITARLA