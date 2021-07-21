//MIDDLEWARE para que si no tenes session te mande a iniciarla

function authMiddleware(req, res, next) {
	if(!req.session.userLogged) {
    return res.redirect('/login');
}next();
}

module.exports = authMiddleware;