const express = require("express");
const router = express.Router();
const db = require('../../database/models');

router.get("/TITO", function (req, res) {
    db.Brand.findAll()
        .then(brand => {
            res.json(brand);
        })
});

module.exports = router

//? RUTA DE DEVELOPER, NO HACERLE DEPLOY PERO TAMPOCO QUITARLA