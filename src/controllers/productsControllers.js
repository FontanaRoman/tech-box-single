// express validator , validaciones
const {validationResult} = require("express-validator")
// database
const db = require("../../database/models");

const productsControllers = {
    // renderiza los productos
    products : function(req,res){
        db.Product.findAll()
            .then(productos=>{
                res.render("products",{productos})
            })
    },
    // renderiza el detalle de un producto
    productDetail : function(req,res){
        const idProduct = req.params.id;
        db.Product.findByPk(idProduct)
            .then(product=>{
                res.render("productDetail", {product});
            })
    },
    // renderiza el carrito
    productCart : function(req,res){
        res.render("productCart");
    },
    // renderiza el formulario para cargar un producto
    loadProduct : function(req,res){
        db.Brand.findAll()
            .then(marcas => {
                db.Category.findAll()
                    .then(category => {
                        res.render("loadProduct", 
                        {
                            marcas : marcas,
                            category : category
                        });
                    })
            })
    },
    // metodo encargado de la logica para almacenar el producto  
    storeLoadProduct : function(req, res){

        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){
            db.Brand.findAll()
            .then(marcas => {
                db.Category.findAll()
                    .then(category => {
                        res.render("loadProduct", 
                        {
                            errors : resultValidation.mapped(),
                            oldData : req.body,
                            marcas : marcas,
                            category : category,
                        });
                    })
            })
        }else {
            db.Product.create(
                {
                name: req.body.productname,
                description: req.body.description,
                stock : req.body.stock,
                discount : req.body.discount,
                category_id: req.body.category,
                state : 1,
                price: req.body.price,
                brand_id : req.body.marca,
                image : req.file.filename,
                }
            )    
                .then(res.redirect("/products"))
        }
    },
    // renderiza el formulario de edicion
    edit : function (req,res){
        db.Product.findByPk(req.params.id)
        .then(product=>{
            db.Brand.findAll()
            .then(marcas => {
                db.Category.findAll()
                    .then(category => {
                        res.render("productEdit", 
                        {
                            marcas : marcas,
                            category : category,
                            product : product,
                        });
                    })
            })
        })
    },
    // metodo encargado de la logica para editar un producto
    storeEdit : function (req,res){

        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){

        db.Product.findByPk(req.params.id)
        .then(product=>{
            db.Brand.findAll()
            .then(marcas => {
                db.Category.findAll()
                    .then(category => {
                        res.render("productEdit", 
                        {
                            errors : resultValidation.mapped(),
                            oldData : req.body,
                            marcas : marcas,
                            category : category,
                            product : product,
                        });
                    })
            })
        })} else {
            db.Product.update(
                {
                    name: req.body.productname,
                    description: req.body.description,
                    image : req.file.filename,
                    stock : req.body.stock,
                    discount : req.body.discount,
                    category_id: req.body.category,
                    state : 1,
                    price: req.body.price,
                    brand_id : req.body.marca,   
                },
                {
                  where : {id : req.params.id}  
                }
            )
                .then(res.redirect("/products"))
        }
    },
    // renderiza el formulario de eliminacion
    deleteForm : function (req,res){
        const idProduct = req.params.id;
        db.Product.findByPk(idProduct)
            .then(product=>{
                res.render("productDelete", {product});
            })
    },
    // metodo encargado de la logica de eliminacion
    delete : function (req,res){
    db.Product.destroy(
        {where : {id : req.params.id}}
    )
        .then(res.redirect("/products"))
    
    },

    admin : (req,res)=>{
        db.Product.findAll()
            .then(productos=>{
                res.render("productsAdmin",{productos})
            })
    },

    // APIS

    // api allProducts
    allProducts : (req,res)=>{
        db.Product.findAll()
            .then((products)=>{
                res.json(
                    {
                        status : 200,
                        data : products
                    }
                )
            })
    },
    // api totalProducts
    totalProducts : (req,res)=>{
        db.Product.findAll()
            .then((products)=>{
                res.json(
                    {
                        status : 200,
                        data : products.length,
                    }
                )
            })
    },
    // api category products
    categoryProduct : (req,res)=>{
        const marcaId = req.body.id
        db.Brand.findAll()
        .then((marcas)=>{
            db.Product.findAll()
                .then(productos =>{
                    res.json({
                        state : 200, 
                        marcas : marcas,
                        productos,
                    })
                })
        })

    },
    // api product id
    productId : (req,res)=>{
        const id = req.params.id;
        db.Product.findByPk(id)
            .then((product)=>{
                res.json({
                    state : 200, 
                    data : product,
                })
            })
    }
}

module.exports = productsControllers;