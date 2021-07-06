/*ARCHIVOS DEL EXPRESS GENERATOR*/
const express = require("express");
const path = require("path");
const methodOverride =  require('method-override');

const app = express();


const router = require("./src/routes/mainRouter");
const usersRouter = require("./src/routes/usersRouter");
const productsRouter = require ("./src/routes/productsRouter")


//VISTAS
app.use("/", router);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.use(express.static(path.resolve(__dirname, "./public")));
//app.use(express.static(path.join(__dirname + "/public")));
app.use(methodOverride('_method'));

// view engine setup
//app.set('views', path.resolve(__dirname, './views'));
//app.set('views', path.join(__dirname + '/views'));

app.set('view engine', 'ejs');

/*ESTRUCTURA DE NUESTROS SPRINTS PREVIOS*/ 
//app.use(express.static(__dirname + "/public"));


//SERVER
app.listen(process.env.PORT || 3077, () =>{
    console.log("servidor corriendo")
});
