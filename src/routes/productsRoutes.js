// controladores de los productos
const productsControllers = require("../controllers/productsControllers");
// Router
const express = require("express");
const router = express.Router();
const multer = require("multer");
// metodo path para armas rutas y nombre del archivo multimedia
const path = require("path");
// validations loadProdcuts
const validationProduct = require("../middleware/validacionFormCargarProducto")
// middleware de admin
const adminMiddleware = require("../middleware/admin")

// configuracion de multer 
const storage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null, path.join(__dirname, "../../public/img/product"));
    },
    filename : function (req,file,cb){
        const ext = path.extname(file.originalname);
        const newFilename = `${Date.now()}_img_product${ext}`;
        cb(null, newFilename);
    }
})

// middleware de multer con la configuracion del archivo
const upload = multer({storage});


// home
router.get("/",productsControllers.products);
// carrito
router.get("/cart", productsControllers.productCart);
// detalle del producto
router.get("/detail/:id", productsControllers.productDetail);

// vista del formulario para cargar un producto
router.get("/loadProduct", productsControllers.loadProduct);
// ruta post para manejar los campos del formulario y la imagen que procesamos con multer
router.post("/loadProduct", upload.single("image"),validationProduct,productsControllers.storeLoadProduct);

// vista del formulario de edicion del producto
router.get("/:id/edit", productsControllers.edit);
router.put("/:id/edit", upload.single("image"),validationProduct,productsControllers.storeEdit);

// eliminar un producto
router.get("/:id/delete", productsControllers.deleteForm);
router.delete("/:id/delete", productsControllers.delete);

// vista del crud para el admin de los productos
router.get("/admin", adminMiddleware,productsControllers.admin);

// APIS

// Api que trae todos los productos
router.get("/api/allProduct",productsControllers.allProducts);

// api que busca un producto por su ID
router.get("/api/:id", productsControllers.productId);

// api que trae cuantos productos hay en una categoria
router.get("/api/categories",productsControllers.categoryProduct);

// Api la cantidad de productos
router.get("/api/allProduct",productsControllers.totalProducts);
// exportamos router para trabajarlo en app
module.exports = router;