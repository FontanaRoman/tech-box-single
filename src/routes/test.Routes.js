const express = require("express");
const router = express.Router();
const db = require('../../database/models');
const Category = require("../../database/models/Category");

router.get("/TITO", function (req, res) {
    db.Category.findAll()
        .then(Category => {
            res.json(Category);
        })
});

module.exports = router

//? RUTA DE DEVELOPER, NO HACERLE DEPLOY PERO TAMPOCO QUITARLA