/*ARCHIVOS DEL EXPRESS GENERATOR*/

var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


/*ESTRUCTURA DE NUESTROS SPRINTS PREVIOS*/ 

const express = require("express");
const app = express();
const path = require("path");


app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => 
    res.sendFile( path.join (__dirname, "/views/index.html"))
    );

app.get("/views/carrito", (req, res) => 
    res.sendFile( path.join (__dirname, "/views/carrito.html"))
    );

app.get("/views/login", (req, res) => 
    res.sendFile(path.join (__dirname, "/views/login.html"))
);

app.get("/views/registro", (req, res) => 
    res.sendFile (path.join (__dirname, "/views/registro.html"))
);

app.get("/views/producto", (req, res) => 
    res.sendFile( path.join (__dirname, "/views/producto.html")))
;

app.listen(3002, () =>{
    console.log("servidor corriendo")
});