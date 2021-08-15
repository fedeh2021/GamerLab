// ************ Require's ************
const fs = require('fs');
const path = require('path');


// ************ Require DATABASE ************
const db = require("../database/models")
const User = require('../models2/User')


// ************ otros Require's ************
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// JSON (borrar cuando esté lista la BDD)
//const usersFilePath = path.join(__dirname, '../data/usersData.json');
//const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));



// ************ Controller ************
const usersController = {

/*** USER LOGIN ***/
    login: (req, res)=> {
        db.Cliente.findAll()
        .then(function(clientes) {
            res.render ("login", {clientes})
        })
    },

    checkLogin: (req, res)=> {
        let userToLogin = User.findByField('email', req.body.email);
        if (userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
            if (isOkThePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
            if (req.body.remember_user){
                res.cookie('userEmail', req.body.email, { maxAge: 1000 * 120})
            }
            return res.redirect('./profile') }
            return res.render('login', {
            errors: {
                email: {
                    msg: 'Las contraseña es incorrecta'}}
                });
            }    
        return res.render('login', {
            errors: {
                email: {
                    msg: 'No se encuentra el email'
                }
            }
        });
        },

/*** REGISTRO ***/
    registro: (req, res) => {
        db.Cliente.findAll()
        .then(function(clientes) {
            res.render ("registro", {clientes})
        })
    },

    checkRegistro: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('registro', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        let userInDb = User.findByField('email', req.body.email);
        if (userInDb) {
            return res.render('registro', {
                errors: {
                    email: {
                    msg: 'Este email ya esta registrado'
                }},
                oldData: req.body
            });
        }
        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename
        }
        let userCreated = User.create(userToCreate);
        return res.redirect('./login')
    },
    
/*** PERFIL ***/
    perfil: (req, res) => {
        return res.render("perfil", { user: req.session.userLogged }) 
        },     

/*** UPDATE ***/
    update: (req, res)=>{
            res.render("perfil", { user: req.session.userLogged }) 
        }, 

/*** CARRITO ***/
    carrito: (req, res)=>{
            res.render("carrito") 
        },

/*** CERRAR SESION ***/
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/')
    }
}


// ************ Export ************
module.exports = usersController;