const mainControlador = {
    index: (req, res) => {
        res.sendFile("./views/index.html")
    }
};

module.exports = mainControlador