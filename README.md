# GamerLab
Repositorio Trabajo Integrador Digital House

INTRODUCCIÓN 
Hola, nosotros somos GamerLab y a continuación vamos a presentar nuestro ecommerce dedicado a la venta de productos relacionados al mundo Gamer.

TECNOLOGÍAS EMPLEADAS
En el armado de este sitio utilizamos los lenguajes de programación Node.js (entorno de ejecución de JAVASCRIPT en el back) y Javascript. Como también lenguajes de hipertexto y estilo, como HTML Y CSS, respectivamente.

ESTRUCTURA DEL PROYECTO
Para comenzar les vamos a comentar la arquitectura del software, que es la de CLIENTE - SERVIDOR, una de las tecnologías más usadas, y con los beneficios de tener mayor seguridad, eficiencia, adaptabilidad. 

SITIO
CARRUSEL
A primera vista podemos ver el index donde hay un carrusel de fotos hecho con Js. Esto le agrega dinamismo al sitio y es llamativo para los visitantes. 

BARRA DE BÚSQUEDA
Tenemos en el header una barra de búsqueda para que quienes quieran buscar un producto en particular puedan realizar la consulta.

CARRITO
Una vez iniciada sesión un usuario puede ingresar a su carrito de compra, donde se irán almacenando los productos que quiera comprar. Este elemento fue creado con Javascript. Un usuario puede seleccionar productos para comprar y automáticamente se sumarán al carrito sin tener usuario pero al momento de querer abonar, le será requerida una cuenta de usuario.

REGISTRO Y LOGIN
En la esquina superior derecha tenemos los botones de registro y login, los mismos redirigen a sus respectivas vistas donde utilizamos diferentes validaciones. 

SEGURIDAD
MIDDLEWARES
Diseñamos el Sitio para que sea seguro, realizamos las validaciones pertinentes mediante middlewares con los cuales pudimos validar el registro y el login del usuario, el formato de las imágenes. Para subir archivos al sitio (como las fotos de usuarios o de productos) utilizamos la librería de Express "Multer". 

VALIDACIONES 
Realizamos las validaciones tanto en el frontend (con JAVASCRIPT) como en el backend (con NODE.JS)
En el registro se validó que estén todos los campos completados, que lo que se ingresa sea un mail y que el formato de la imagen sea apropiado. En el login se valida tanto que el mail como que la contraseña sean los mismos que los ingresados en el registro.
También utilizamos bcrypt para hashear la contraseña y que la guarde en la base de datos ya encriptada. 

COOKIES Y SESSION
Utilizamos Cookies y sesión para almacenar información de los usuarios.

En cuanto a la 
ARQUITECTURA DEL SISTEMA
Trabajamos con el framework Express, y utilizamos el patrón de diseño MVC (MODELO, VISTA, CONTROLADOR), para ordenar los archivos del proyecto, y que se comuniquen el frontend y el backend. 
La implementación del sistema de ruteo también fue necesaria para lograr la apropiada conexión con los métodos del controlador.

VISTA
Utilizamos HTML, CSS,
Utilizamos como motor de plantillas EJS que nos permitió generar vistas que contengan información y estructuras dinámicas.

RUTA
Las solicitudes del cliente se hacen bajo el protocolo HTTP (HyperText Transfer Protocol), el cual presenta los métodos CRUD (CREATE, READ, UPDATE, DELETE), y a través de estos métodos fuimos capaces de solicitar datos al servidor a través de la URL (GET), pudimos enviar datos al servidor (POST), pudimos reemplazar información existente en los “editar producto” y “editar usuario” (PUT), y pudimos borrar registros en el servidor (DELETE).

CONTROLADOR
El MODELO se comunica con la 

BASE DE DATOS
Que fue hecha en MySql. 
En la misma se detallaron datos de los usuarios y de los productos. 
También se llevó un registro de las compras asociadas a cada cliente. 
Luego pudimos acceder a esta base en nuestro proyecto gracias a la ORM |Sequelize. 

ADMIN
SISTEMA ADMIN
Para administrar el sitio generamos un usuario con permisos de administrador, el cual puede llegar a partes del sitio que un usuario regular no puede. Como, por ejemplo, editar un producto o crearlo.

API - REST
En últimas instancias creamos algunas API’s rest, estas presentan una arquitectura cliente-servidor que permite que la app del cliente como la del servidor se desarrollen sin intervenir una con la otra. 
Las API’s que hicimos nos permiten ver información sobre la cantidad de productos y clientes en base de datos, como así también sus características.

REACT
Por último, incluimos React, una librería de Javascript para facilitar la creación de componentes interactivos. Lo único del sitio que está en React es un dashboard donde se dan algunos datos sobre cantidad de productos, clientes y categorías, datos que fueron llevados al panel luego de haber fetcheado las apis anteriormente realizadas. Esos datos son los que a su vez, salen de la base de datos.
 
 

