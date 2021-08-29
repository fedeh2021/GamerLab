//MIDDLEWARE PARA QUE SI NO TENES SESSION TE MANDE A INICIARLA

function authMiddleware(req, res, next) {
	if(!req.session.userLogged) {
        return res.redirect('./login');
    }
    next();
}

module.exports = authMiddleware;