// ************ Require's ************
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User')

const usersFilePath = path.join(__dirname, '../data/usersData.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


// ************ User login ************


// ************ Controller ************
const usersController = {
    login: (req, res)=> {
        return res.render("login")
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
    registro: (req, res) => {
            return res.render("registro")
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
    
    perfil: (req, res) => {
        return res.render("perfil", { user: req.session.userLogged }) 
        },     
    update: (req, res)=>{
            res.render("perfil", { user: req.session.userLogged }) 
        }, 

    carrito: (req, res)=>{
            res.render("carrito") 
        },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/')
    }
}

module.exports = usersController;