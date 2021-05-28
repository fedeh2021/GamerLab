const express = require("express");
const app = express();
const path = require("path");


app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    const pathHtml = path.join (__dirname, "/views/index.html")
    res.sendFile(pathHtml)
});
app.get("/carrito", (req, res) => {
    const pathHtml = path.join (__dirname, "/views/carrito.html")
    res.sendFile(pathHtml)
});

app.get("/login", (req, res) => {
    const pathHtml = path.join (__dirname, "/views/login.html")
    res.sendFile(pathHtml)
});

app.get("/registro", (req, res) => {
    const pathHtml = path.join (__dirname, "/views/registro.html")
    res.sendFile(pathHtml)
});

app.listen(3002, () =>{
    console.log("servidor corriendo")
});