const usersController = 
{
    registro: (req, res) => {
        res.render("registro")
    },

    login: (req, res)=> {
        res.render("login")
    },
 
    perfil: (req, res)=>{
        res.render("perfil") //esta vista no existe
    },     

    carrito: (req, res)=>{
        res.render("carrito") 
    }
}

module.exports = usersController;