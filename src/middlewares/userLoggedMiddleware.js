//MIDDLEWARE APLICACION PARA NO MOSTRAR LAS OPCIONES SI YA INICIASTE SESION 

const db = require("../database/models")
const Cliente = require("../database/models/Cliente")

function userLoggedMiddleware(req,res, next) { 
	
/*
	res.locals.isLogged = false;
	let emailInCookie = req.cookies.userEmail; //traer la cookie para iniciar automaticamente
	let userFromCookie = 	db.Cliente.findOne({
								where: {email: emailInCookie}
							})
	
if (userFromCookie) {
	req.session.userLogged = userFromCookie;
}
if (req.session.userLogged) {
	res.locals.isLogged = true;
	res.locals.userLogged = req.session.userLogged;  //pasa de la sessiion a una variale local
}

*/
next();
}

module.exports = userLoggedMiddleware;

