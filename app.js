/*ARCHIVOS DEL EXPRESS GENERATOR*/
const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const cookies = require('cookie-parser');
const session = require('express-session');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');

const app = express();

const router = require("./src/routes/mainRouter");
const usersRouter = require("./src/routes/usersRouter");
const productsRouter = require ("./src/routes/productsRouter")

app.use(session({ secret: "es secreto", resave: false, saveUninitialized: false}))
app.use(cookies());
app.use(userLoggedMiddleware);

app.use(express.static(path.resolve(__dirname, "./public")));
//app.use(express.static(path.join(__dirname + "/public")));

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// view engine setup
//app.set('views', path.resolve(__dirname, './views'));
//app.set('views', path.join(__dirname + '/views'));

app.set('view engine', 'ejs');

/*ESTRUCTURA DE NUESTROS SPRINTS PREVIOS*/ 
//app.use(express.static(__dirname + "/public"));

//VISTAS
app.use("/", router);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

//SERVER
app.listen(process.env.PORT || 3077, () =>{
    console.log("servidor corriendo")
});

//CORS
const cors = require ("cors")
app.use(cors({
    origin: "http://localhost:3000"
}))

app.get