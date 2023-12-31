// require de express y ejecucion
const express = require("express");
const app = express();
// require de express session
const session = require("express-session");
//require cookie
const cookies = require("cookie-parser");
// middleware de recuerdame
const recuerdame = require("../src/middleware/cookieMiddleware")
// CORS
const cors = require("cors")
// use para el metodo session
app.use(session(
    {
        secret : "secret no se me ocurrio otra cosa",
        resave : false,
        saveUninitialized : false,
    }
))
app.use(cookies());

// routes
const mainRoutes = require("./routes/mainRoutes");
const productsRoutes = require("./routes/productsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const apiRoutes = require("./routes/apiRoutes")

// require metodo path
const path = require("path");

//require mmethodOverride
const methodOverride = require('method-override');

// config templete engina y ruta elementos estaticos
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static("public"));

//Cors
let corsOptions = {
    origin: "*"
}
app.use(cors(corsOptions))

// config para method override
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended : false}));
app.use(express.json());

// indicamos los routes
app.use("/",mainRoutes);
app.use("/products",productsRoutes);
app.use("/user", usersRoutes);
app.use("/api",apiRoutes);

//aplicamos el recuerdame
app.use(recuerdame)

// indicamos como proceder ante el error 404
app.use((req, res, next) => {
    res.status(404).render('not-found');
})

// levantamos el server
app.listen(3000,()=>{
    console.log("funcionanado en el puerto 3000");
})