// ************ Require's ************
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersData.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


// ************ Controller ************
const usersController = 
{
    login: (req, res)=> {
            let checkEmail = req.params.email
            let checkPassword = req.params.password;

            for(let i = 0; i <users.length; i++){
                if (checkEmail == users[i].email && checkPassword == users[i].password){
                    var usuarioEncontrado = users[i]
                }
            }
            res.render("login", {usuario: usuarioEncontrado})
        },

    checkLogin: (req, res)=> {
        res.send("hola")
    },
    
    registro: (req, res) => {
            res.render("registro", {usuario: users})
        },

    checkRegistro: (req, res) => {
            let nuevoId = users[users.length-1].id + 1; 
            let info = req.body
		    let nuevoObjeto = Object.assign({id: nuevoId}, info);

		    users.push(nuevoObjeto);
		    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
		    res.redirect('/'); 
        },
 
    perfil: (req, res)=>{
            let idUser = req.params.id
            res.render("perfil", {usuario: users, id: idUser}) 
        },     

    update: (req, res)=>{
            let idUser = req.params.id
            res.render("perfil", {usuario: users, id: idUser}) 
        }, 

    carrito: (req, res)=>{
            res.render("carrito") 
        }
}

module.exports = usersController;