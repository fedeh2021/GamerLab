CREATE DATABASE IF NOT EXISTS `gamerlab`;
USE `gamerlab`;

-- Table structure for table `categorias`

CREATE TABLE `categorias` (
`id` INT NOT NULL AUTO_INCREMENT,
`nombre` VARCHAR(255) DEFAULT NULL,
`descripcion` VARCHAR(510) DEFAULT NULL,
`created_at` DATETIME DEFAULT NULL, 
`updated_at` DATETIME DEFAULT NULL, 
`deleted_at` DATETIME DEFAULT NULL, 
PRIMARY KEY (`id`)
);

-- Table structure for table `productos`

CREATE TABLE `productos` (
`id` INT NOT NULL AUTO_INCREMENT,
`categoriaFK` INT DEFAULT NULL,
`nombre` VARCHAR(255) DEFAULT NULL,
`imagen` VARCHAR(255) DEFAULT NULL,
`descripcion` VARCHAR(510) DEFAULT NULL,
`precio_lista` DECIMAL DEFAULT NULL,
`descuento` DECIMAL DEFAULT NULL,
`created_at` DATETIME DEFAULT NULL,
`updated_at` DATETIME DEFAULT NULL,
`deleted_at` DATETIME DEFAULT NULL,
PRIMARY KEY (`id`),
FOREIGN KEY (`categoriaFK`) REFERENCES `categorias`(`id`)
);

-- Table structure for table `facturas`

CREATE TABLE `facturas` (
`id` INT NOT NULL AUTO_INCREMENT,
`total_a_pagar` DECIMAL DEFAULT NULL,
PRIMARY KEY (`id`)
);

-- Table structure for table `envios`

CREATE TABLE `envios` (
`id` INT NOT NULL AUTO_INCREMENT,
`pais` VARCHAR(255) DEFAULT NULL,
`ciudad` VARCHAR(255) DEFAULT NULL,
`region` VARCHAR(255) DEFAULT NULL,
`direccion` VARCHAR(255) DEFAULT NULL,
`altura` VARCHAR(255) DEFAULT NULL,
`piso` VARCHAR(255) DEFAULT NULL,
`codigo_postal` VARCHAR(255) DEFAULT NULL,
PRIMARY KEY (`id`)
);

-- Table structure for table `clientes`

CREATE TABLE `clientes` (
`id` INT NOT NULL AUTO_INCREMENT,
`envioFK` INT DEFAULT NULL,
`nombre` VARCHAR(255) DEFAULT NULL,
`apellido` VARCHAR(255) DEFAULT NULL,
`email` VARCHAR(255) DEFAULT NULL,
`contrasena` VARCHAR(255) DEFAULT NULL,
`rol` BOOLEAN DEFAULT NULL,
`dni` INT DEFAULT NULL,
`fecha_nacimiento` DATE DEFAULT NULL,
`telefono` INT DEFAULT NULL, 
`imagen` VARCHAR(255) DEFAULT NULL,
`created_at` DATETIME, 
`updated_at` DATETIME, 
`deleted_at` DATETIME, 
PRIMARY KEY (`id`),
FOREIGN KEY (`envioFK`) REFERENCES `envios`(`id`)
);

-- Table structure for table `pedidos`

CREATE TABLE `pedidos` (
`id` INT NOT NULL AUTO_INCREMENT,
`clienteFK` INT DEFAULT NULL,
`productoFK` INT DEFAULT NULL,
`facturaFK` INT DEFAULT NULL,
`precio_venta` DECIMAL DEFAULT NULL,
`cantidad_prod` INT DEFAULT NULL,
`estado` VARCHAR(255) DEFAULT NULL, 
PRIMARY KEY (`id`),
FOREIGN KEY (`clienteFK`) REFERENCES `clientes`(`id`),
FOREIGN KEY (`productoFK`) REFERENCES `productos`(`id`),
FOREIGN KEY (`facturaFK`) REFERENCES `facturas`(`id`)
);

INSERT INTO `clientes` VALUES(1,1,'Miguel','Apellido','email@email.com','contrasena',1,'43434343','2001-10-17','11221212','avatar.jpg','2021-07-22 16:30:00','2021-07-22 16:30:00','2021-07-22 16:30:00'),(2,2,'Fede','Apellido','email@email.com','contrasena',1,'43434343','2001-10-17','11221212','avatar.jpg','2021-07-22 16:30:00','2021-07-22 16:30:00','2021-07-22 16:30:00'),(3,3,'Facu','Apellido','email@email.com','contrasena',1,'43434343','2001-10-17','12121212','avatar.jpg','2021-07-22 16:30:00','2021-07-22 16:30:00','2021-07-22 16:30:00');
INSERT INTO `envios` VALUES(1,'Argentina','CABA','barrio','Av. Santa Fe','1234','3A','1111'),(2,'Argentina','CABA','barrio','Av. Callao','1234','2A','2222'),(3,'Argentina','CABA','barrio','Av. Las Heras','1234','7A','4444');
INSERT INTO `facturas` VALUES(1,500),(2,3000),(3,9000);
INSERT INTO `pedidos` VALUES(1,1,1,1,500,1,'procesando pedido'),(2,2,2,2,3000,2,'procesando pedido'),(3,3,3,3,9000,3,'procesando pedido');

INSERT INTO `categorias` VALUES(1,'Notebooks','descripcion','2021-08-01 00:00:00',null,null),(2,'Monitores','descripcion','2021-08-01 00:00:00',null,null),(3,'Teclados y mouses','descripcion','2021-08-01 00:00:00',null,null),(4,'Audio','descripcion','2021-08-01 00:00:00',null,null),(5,'Placas de video','descripcion','2021-08-01 00:00:00',null,null),(6,'Sillas y escritorios','descripcion','2021-08-01 00:00:00',null,null);

INSERT INTO `productos` VALUES
(1,3,'Mouse Genérico','mouse2.jpg','El mouse de juego te ofrecerá la posibilidad de marcar la diferencia y sacar ventajas en tus partidas. Su conectividad y sensor suave ayudará a que te desplaces rápido por la pantalla.',11499,20,'2021-08-01 00:00:00',null,null),
(2,3,'Mouse Gamer WT4','mouse.jpg','El mouse de juego te ofrecerá la posibilidad de marcar la diferencia y sacar ventajas en tus partidas. Su conectividad y sensor suave ayudará a que te desplaces rápido por la pantalla.',17900,15,'2021-08-01 00:00:00',null,null),
(3,2,'Monitor Gamer','monitor.jpg','Este monitor de 25 te va a resultar cómodo para estudiar, trabajar o ver una película en tus tiempos de ocio. Asimismo, su resolución de 2560 x 1080 te permite disfrutar de momentos únicos gracias a una imagen de alta fidelidad.',79000,20,'2021-08-01 00:00:00',null,null),
(4,2,'Monitor Gamer Curved','monitor1.jpg','Este monitor de 25 te va a resultar cómodo para estudiar, trabajar o ver una película en tus tiempos de ocio. Asimismo, su resolución de 2560 x 1080 te permite disfrutar de momentos únicos gracias a una imagen de alta fidelidad.',99000,10,'2021-08-01 00:00:00',null,null),
(5,3,'Teclado Gamer','teclado1.jpg','Este teclado de alto rendimiento permite que puedas disfrutar de horas ilimitadas de juegos. Está diseñado especialmente para que puedas expresar tanto tus habilidades como tu estilo. Podrás mejorar tu experiencia de gaming, ya seas un aficionado o todo un experto y hacer que tus jugadas alcancen otro nivel.',29000,15,'2021-08-01 00:00:00',null,null),
(6,3,'Teclado Gamer Revenge','teclado.jpg','Este teclado de alto rendimiento permite que puedas disfrutar de horas ilimitadas de juegos. Está diseñado especialmente para que puedas expresar tanto tus habilidades como tu estilo. Podrás mejorar tu experiencia de gaming, ya seas un aficionado o todo un experto y hacer que tus jugadas alcancen otro nivel.',39000,10,'2021-08-01 00:00:00',null,null),
(7,4,'Auriculares Gamer','auriculares.jpg','¡Experimentá la adrenalina de sumergirte en la escena de otra manera! Tener auriculares específicos para jugar cambia completamente tu experiencia en cada partida.',17900,20,'2021-08-01 00:00:00',null,null),
(8,4,'Auriculares Gamer Pro','auriculares-1-fondo-blanco.jpg','¡Experimentá la adrenalina de sumergirte en la escena de otra manera! Tener auriculares específicos para jugar cambia completamente tu experiencia en cada partida.',14900,15,'2021-08-01 00:00:00',null,null),
(9,6,'Silla Gamer Dooku B&R','silla-gamer.jpg','Butaca de ecocuero en color rojo. Soporta hasta 150kg y tiene altura regulable y gira 360º. Totalmente reclinable 180º',35999,10,'2021-08-01 00:00:00',null,null),
(10,5,'Kit Completo Gamer','kit-completo.jpg','Kit completo para comenzar la aventura del gaming!',249999,5,'2021-08-01 00:00:00',null,null);


-- SELECT * FROM clientes
-- SELECT * FROM envios
-- SELECT * FROM facturas
-- SELECT * FROM pedidos
-- SELECT * FROM productos
-- SELECT * FROM categorias

