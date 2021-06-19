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
    }     
}

module.exports = usersController;