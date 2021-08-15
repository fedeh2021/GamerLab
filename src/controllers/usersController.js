// ************ Require's ************
const fs = require('fs');
const path = require('path');


// ************ Require DATABASE ************
const db = require("../database/models")
//const User = require('../models2/User')


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
        return res.render("login")
    },

    checkLogin: (req, res)=> {
        let userToLogin =   db.Cliente.findOne({
                                where: {email: req.body.email}
                            }) 

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
        let userInDb =  db.Cliente.findOne({
                            where: {email: req.body.email}
                        })
        .then(res => {
            if (!res || res.length === 0) {

                db.Cliente.create({
                    nombre: req.body.name,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    contrasena: bcryptjs.hashSync(req.body.password, 10),
                    rol: 0,
                    dni: req.body.dni,
                    fecha_nacimiento: req.body.fecha_nacimiento,
                    telefono: req.body.telefono,
                    imagen: req.body.image,
                    created_at: req.body.datetime,
                    created_at: req.body.datetime,
                    created_at: req.body.datetime,
                })

                res.redirect('./login')

                /*
                let userToCreate = {
                    ...req.body,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    avatar: req.file.filename
                }

                let userCreated = db.Cliente.create(userToCreate);
                */


            } else {
            return res.render('registro', {
                errors: {
                    email: {
                    msg: 'Este email ya esta registrado'
                }},
                oldData: req.body
            })}
        })
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