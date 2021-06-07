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