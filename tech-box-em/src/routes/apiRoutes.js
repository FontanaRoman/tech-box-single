const { Router } = require("express");
const router = Router();
const productsControllers = require("../controllers/productsControllers");
const usersControllers = require("../controllers/usersControllers");

// Rutas de usuarios
router.get("/user/lastUser", usersControllers.lastUser);
router.get("/user/allUser", usersControllers.allUserApi);
router.get("/user/totalUser", usersControllers.totalUserApi);
router.get("/user/:id", usersControllers.userIdFind);

// Rutas de productos
router.get("/lastProduct",productsControllers.lastUser)
router.get("/allProducts", productsControllers.allProducts);
router.get("/product/:id", productsControllers.productId);
router.get("/categoryProducts", productsControllers.categoryProduct);
router.get("/totalProducts", productsControllers.totalProducts);

module.exports = router;
