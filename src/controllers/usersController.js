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
const storage = require("../middlewares/multerMiddleware")
const userLogged = require('../middlewares/userLoggedMiddleware')


// ************ Controller ************
const usersController = {

/*** USER LOGIN ***/
    login: (req, res) => {
        db.Cliente.findAll()
       .then(function(clientes) {
            res.render ("login", {clientes})
        })
    },
/*
    checkLogin: (req, res) => {

        db.Cliente.findOne({
            where: {email: req.body.email}
            })
            
            
            .then( user => {

                let contrasena = false
                let mail = false


                if (user){
                    mail = true

                    console.log("ERROR MAIL")

                    if (bcryptjs.compareSync(req.body.contrasena, user.contrasena)) {

                        console.log("ERROR CONTRASENA")

                        req.session.userLogged = user;
                        contrasena = true

                        if (req.body.remember_user){
                            res.cookie('userEmail', req.body.email, { maxAge: 1000 * 120})
                        }

                    } 
                
                    }
            
                    console.log(contrasena)
                    console.log(mail)


                if (contrasena == true && mail == true) {

                    console.log("ERROR contra")

                    res.redirect('users/profile') 
                } {
                    res.render('login', {
                        errors: {
                            email: {
                                msg: 'Credenciales incorrectas'
                            }
                        }
                    })

                    console.log("ERROR")
                }


                })
            },

*/

/*** LOGIN FUNCIONA ***/

    checkLogin: (req, res) => {

        db.Cliente.findOne({
            where: {email: req.body.email}
            })
            
            .then( user => {
                let contrasena = false
                let mail = false

                if (user){
                    mail = true
                    contrasena = true
                    if (bcryptjs.compareSync(req.body.contrasena, user.contrasena)) {
                        req.session.userLogged = user;
                    }

                    if (req.body.remember_user){
                        res.cookie('userEmail', req.body.email, { maxAge: 1000 * 3600})
                    }
        
                    return res.redirect('./profile')
                 } else {

                    return res.render('login', {
                        errors: {
                            email: {
                                msg: 'Las credenciales son incorrectas'}}
                            })    
                        }
                    })
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


        db.Cliente.count({
                        where: {email: req.body.email}
                        })
            .then(count => {
                if (count != 0) {

                res.render('registro', {
                    errors: {
                        email: {
                        msg: 'Este email ya esta registrado'
                    }},
                    oldData: req.body
                })

            } else {
                
             db.Cliente.create({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    contrasena: bcryptjs.hashSync(req.body.contrasena, 10),
                    rol: 0,
                    dni: req.body.dni,
                    fecha_nacimiento: req.body.fecha_nacimiento,
                    telefono: req.body.telefono,
                    imagen: req.file.filename,
                    envio_fk: null,
                    created_at: Date.now(),
                    updated_at: Date.now(),
                    deleted_at: Date.now(),
                })
                res.redirect('./login');
            }
        })
    },


/*** PERFIL ***/
    perfil: (req, res) => {
        return res.render("perfil", { user: req.session.userLogged }) 
        },     

/*** UPDATE ***/
    update: (req, res)=>{
            db.Cliente.update({
                nombre: req.body.name,
                apellido: req.body.apellido,
                imagen: req.file.filename,
                cumpleanos:req.body.cumpleanos,
                telefono: req.body.telefono, 
                dni: req.body.dni,
                telefono: req.body.telefono
                   
            }, {where:{
                id:req.params.id
                }}
            )
            res.redirect('/users/profile/' + req.params.id);  
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