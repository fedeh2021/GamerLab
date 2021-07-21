//MIDDLEWARE PARA LAS RUTAS Y QQUE NO TE DEJE VOLVER A REGISTARTE SI YA INICISTAE SESSION

function guestMiddleware (req, res, next) {
	if(req.session.userLogged) {
	return res.redirect('./perfil');
	}next();
}

module.exports = guestMiddleware;

