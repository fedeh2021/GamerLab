const express = require("express");
const app = express();
const path = require("path");


app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    const pathHtml = path.join (__dirname, "/views/home.html")
    res.sendFile(pathHtml)
});



app.listen(3002, () =>{
    console.log("servidor corriendo")
});