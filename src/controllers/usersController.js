// ************ Require's ************
const fs = require('fs');
const path = require('path');

// ************ Require DATABASE ************
const db = require("../database/models")

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
                    let isOkThePassword = bcryptjs.compareSync(req.body.contrasena, user.contrasena);
                    if(isOkThePassword){
                        delete user.contrasena;
                        req.session.userLogged = user;

                    if (req.body.remember_user){
                        res.cookie('userEmail', req.body.email, { maxAge: 1000 * 3600})
                    }
                    return res.redirect('./profile')

                } return res.render('login', {
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
                    updated_at: 0,
                })
                res.redirect('./login');
            }
        })
    },


/*** PERFIL ***/
    perfil: (req, res) => {
        db.Cliente.findAll()
        .then(function(user){
            return res.render('perfil', {user: req.session.userLogged})
        })
    },  

    editarPerfil: (req, res) => {
        db.Cliente.findByPk(req.params.id)
        .then((user)=>{
        return res.render('edicionPerfil', {user})
        })
    },


/*** UPDATE ***/
    update: (req, res)=>{ 
            db.Cliente.update({
                nombre: req.body.name,
                apellido: req.body.apellido,
                //imagen: req.file.filename,
                email: req.body.email,
                cumpleanos:req.body.cumpleanos,
                telefono: req.body.telefono, 
                dni: req.body.dni,
                updated_at: Date.now(),
                   
            }, {where:{
                id:req.params.id
                }}
            )
            res.redirect('/users/profile/' + req.params.id);  
    },
        

/*** CARRITO ***/
    carrito: (req, res) => {
        db.Producto.findAll()
       .then(function(productos) {
            res.render ("carrito", {productos})
        })
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