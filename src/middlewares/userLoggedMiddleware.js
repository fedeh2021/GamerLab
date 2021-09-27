//MIDDLEWARE APLICACION PARA NO MOSTRAR LAS OPCIONES SI YA INICIASTE SESION 

const db = require("../database/models")

 function userLoggedMiddleware(req, res, next) { 
	res.locals.isLogged = false;
	//cambie esto
	let emailInCookie = req.cookies.user; //traer la cookie para iniciar automaticamente
	let userFromCookie = null;

	if (emailInCookie) {
		userFromCookie = db.Cliente.findByPk(emailInCookie)
	} {
		res.locals.isLogged = false;
	}
	
	if (userFromCookie) {
			req.session.userLogged = userFromCookie;
	}

	if (req.session.userLogged) {
			res.locals.isLogged = true;
			res.locals.userLogged = req.session.userLogged;  //pasa de la session a una variale local
	}

	next();
}

module.exports = userLoggedMiddleware;