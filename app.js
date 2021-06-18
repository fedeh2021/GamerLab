/*ARCHIVOS DEL EXPRESS GENERATOR*/

const express = require("express");
const app = express();
const path = require("path");
const router = require("./src/routes/mainRoute");
const userRouter = require("./src/routes/users");
const productController = require ("./src/routes/productsRouter")
app.use(express.static(path.join(__dirname + "/public")));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*ESTRUCTURA DE NUESTROS SPRINTS PREVIOS*/ 

app.use(express.static(__dirname + "/public"));

//VISTAS
app.use("/", router);

app.use("/users", userRouter);

app.use("/products", productsRouter);


//SERVER
app.listen(3002, () =>{
    console.log("servidor corriendo")
});
