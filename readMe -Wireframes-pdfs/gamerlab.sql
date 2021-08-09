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