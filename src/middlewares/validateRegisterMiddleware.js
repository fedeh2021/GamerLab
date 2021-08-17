const path = require('path');
const { body } = require('express-validator');

module.exports = [

	body('nombre').notEmpty().withMessage('Tienes que escribir un nombre'),
	body('apellido').notEmpty().withMessage('Tienes que escribir un apellido'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('contrasena').notEmpty().withMessage('Tienes que escribir una contraseña'),
	body('dni').notEmpty().withMessage('Tienes que escribir tu dni'),
	body('fecha_nacimiento').notEmpty().withMessage('Tienes que elegir una fecha de cumpleaños'),
	body('telefono').notEmpty().withMessage('Tienes que escribir tu teléfono'),
	body('imagen').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif','jpeg'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]
