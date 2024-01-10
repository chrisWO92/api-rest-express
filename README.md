# API REST CON EXPRESS JS Y BASES DE DATOS CON POSTGRESQL
Primero que todo se ejecuta el comando `npm init -y` y el comando `git init`. También se crean los archivos .gitignore, .editorconfig y .eslintrc.json, que son usados para definir parámetros del entorno de desarrollo.

Luego se deben definir los contenidos de estos archivos, que serán objetos entre llaves {} con una serie de pares llave-valor que definen parámetros para nuestro entorno de desarrollo.

En el package.json definimos unos comandos para correr nodemon cuando usamos el comando `npm run dev`, y debemos también instalar nodemon y otras configuraciones eslint de prettier que nos permitirán trabajar mejor.

Estas caracterísitcas las tenemos con el siguiente comando:

`npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier pritter -D`

## Uso de la aplicación
En la terminal ejecuta `nodemon index.js` luego de haberlo instalado.

## REST: Representational State Transfer

GET: obtener info
PUT: Modificaciones
PATCH: Actualización de productos particulares
POST: Creación
DELETE: Eliminación

### GET
Los endpoints tipo GET deberían apuntar a rutas del tipo `/products/{id}`, es decir, que antes de apuntar al producto específico, debemos pasar por el conjunto de productos cuyo nombre debe estar en plural.

## SINGLE RESPONSABILITY PRINCIPLE
Cada trozo de código debería tener una sóla función o responsabilidad.

## BOOM
Se instala como npm i ``@hapi/boom``
Sirve para manejar los tipos de errores.
En esta aplicacion, boom se usa en el ``product.service.js`` para emitir un error cuando se intenta encontrar un producto pero el id no existe. Por ende, también se envían errores de tipo boom cuando se quiere actualizar, y cuando se quiere borrar un producto.

## JOI
Siempre que le vamos a enviar datos al servidor a través de requests debemos asegurarnos de que el formato de estos datos es el correcto. Para eso se usa JOI, para validar si los datos que enviamos al servidor tienen las características que deben tener.
``npm i joi``

## CONSIDERACIONES PARA PRODUCCIÓN
Antes de enviar a producción debemos tener ciertas consideraciones:

- CORS: Cross Origin Resource Sharing. Es un problema que debemos contemplar antes de hacer deploy. La petición de datos a nuestra aplicación desde distintos orígenes debe ser funcional y no generar errores.
- Https: debemos asegurarnos que funciona en https y no en http, por temas de seguridad.
- Procesos de build: debemos asegurarnos que los procesos de building esten corriendo bien.
- Remover logs: remover los logs de nuestra aplicación ya que no es bien visto que estén en el entregable final.
- Seguridad (Helmet): Helmet es un middleware que nos ayuda a configurar la seguridad de la aplicación.
- Testing: Hacer testings unitarios para asegurarnos que todo está bien.

### Problema de CORS
``npm i cors``
Debemos instalarlo y llamarlo en nuestra aplicación, en el ``index.js``. Podemos optar por darle acceso a todos los orígenes que se quieran conectar, en caso que seamos una API pública, o podemos definir ciertos orígenes permitidos para que sólo esos puedan obtener la información.

## Deployment a Heroku
Debemos crear una cuenta en Heroku y luego seguir los pasos que están descritos en la documentación de Heroku.

## Bases de datos
Cómo configurar y usar bases de datos con Nodejs, Postgres y Docker. 

### Docker
Se debe descargar Docker y asegurarse que se encuentra habilitado el uso con WSL. Posteriormente es necesario crear un archivo llamado `docker-compose.yml` y definir parámetros de configuración (ver archivo).

Para levantar el servicio en docker:
`docker-compose up -d <nombre-servicio>` que es el nombre usado en el `docker-compose.yml`. En este caso es `postgres`

Para verificar los servicios activos:
`docker-compose ps`

Para bajar los servicios activos:
`docker-compose down`

Los contenedores son stateless, lo que es un problema para las bases de datos, ya que estas deben tener estados. Por esta razón debemos indicarle a docker un 'volumen' para nuestra base de datos. Esto se hace en el `docker-compose.yml` definiendo la carpeta en la que queremos guardar la información de la base de datos, y luego debemos crear dicha carpeta en nuestro repositorio. En este caso la carpeta se llama `postgress_data`. Esta carpeta debemos agregarla al gitignore ya que no queremos que los datos que contiene se suban al repositorio remoto de github.

De esta forma se logra tener persistencia de datos con docker.

Para conectar a la base de datos desde la terminal:
`docker-compose exec postgres bash`

Cuando se ejecute este comando, podemos conectarnos con la base de datos:
`psql -h localhost -d <nombre-base-datos> -U <usuario>`
`psql -h localhost -d api_express_docker -U cristian`

Para ver relaciones de la base de datos:
`\d+`

Para salir de la base de datos:
`\q`

Sin embargo, también podemos conectarnos a través de un motor gráfico para que sea más sencillo. El que suele usarse es `pgAdmin` ya que corre bajo el navegador. Para poder usarlo debemos crear un servicio adicional en el archivo `docker-compose.yml`

Luego, para levantar el servicio de pgadmin, se ejecuta el siguiente comando:
`docker-compose up -d pgadmin`

Para crear una base de datos en pgadmin debemos primero crear un server. Para eso vamos a necesitar el IP sobre el que se encuentra corriendo postgres. Para saber esto, ejecutamos el comando:
`docker ps` que es lo mismo que `docker-compose ps` pero que muestra más detalles. Dentro de estos detalles está el id de los servicios. Debemos tomar el id del servicio postgres.

Cuando tenemos el id, hacemos `docker inspect <id>` y en la información que se muestra a continuación podemos ver el IP.

Esto lo ponemos en el formulario de creación de un server y le damos "save".

### Creación de la primera DB
En la opción "Query tool" ingresamos la siguiente instrucción para crear una tabla vacía:

CREATE TABLE tasks (
    id serial PRIMARY KEY,
    title VARCHAR (255) NOT NULL,
    completed boolean DEFAULT false
)

Presionamos el botón de "play" y veremos que ahora nos aparece una tabla en Schemas->public->Tables->tasks
Le damos click derecho, View All Rows y nos mostrará una vista de la tabla recién creada.

Esto también lo podemos ver en la terminal con el comando `docker-compose exec postgres bash` y `\d+`

### Integración Node Postgres
Para conectar Node y Postgres tenemos que usar una librería llamada `pg`. Podemos encontrarla en internet como node-postgres y ver la documentación. Se instala con `npm install pg`.

Luego creamos una carpeta nueva, que será una capa más de nuestra arquitectura, y le daremos el nombre ``libs`` para indicar que aquí estarán guardadas las librerías.

En esta carpeta creamos un archivo `postgres.js` que contiene la función para crear un cliente de conexión a la base de datos de postgres que creamos previamente, llamada "tasks", que por el momento está vacía.

Para hacer la conexión, importamos esta función que llamamos `getConnection()`, en el archivo de `users.service.js`. Podría ser en cualquiera de los services, pero elegimos este como ejemplo. 

Se importa la función y se usa en el método `find()`. En este se crea un cliente, y con este se ejecuta una query de consult a la DB de postgres donde tenemos las tareas. Si la tenemos vacía, en Insomnia la GET Request para Users nos traerá un array vacío, pero si ya hemos empezado a poblar esta DB, nos traerá las "rows" que hayamos incluído.

### Clean Arquitechture
En este momento del código podemos observar que hemos creado distintas carpetas, cada una con su función particular. Tenemos una para los servicios, otra para los esquemas, otra para el enrutamiento, y otra para los controladores o middlewares. A esto se le conoce como la filosofía de código "Clean Arqutechture".

Clean Arquitechture es una filosofía de diseño que separa los elementos deun diseño en anillos de niveles. El objetivo principal es encapsular la lógica de negocio y mantenerla separada del mecanismo de entrega de datos.

El anillo de niveles de Clean Arquitechture tiene el siguiente orden de adentro hacia afuera:

Entidades: Reglas de negocio -> Casos de Uso: Reglas de Negocio de la app -> Controladores, Presentadores, Puertas de Enlace: Interface Adapters -> DB, Devices, Web, UI, External Interfaces: Frameworks & Drivers.

### Manejando pool de conexiones
En el código hemos incluído la función `getConnection()` en el método `find()` del servicio de users. Sin embargo, la manera en la que lo hicimos hace que cada vez que ejecutamos la consulta, se cree una conexión nueva, lo cual no es eficiente. 

Por este motivo, postgre sugiee el uso de una funcionalidad que llaman POOLING. 

Un pool de conexiones es un conjunto limitado de conexiones a una base de datos, que es manejado por un servidor de aplicaciones de forma tal, que dichas conexiones pueden ser reutilizadas por los diferentes usuarios. De esta forma gestionamos las conexiones de manera más óptima, evitando crear clientes por cada consulta.

### Variables de ambiente en Nodejs
Actualmente en el código estamos escribiendo la información relacionada a usuario, contraseña, y demás parámetros necesarios para conectarnos a nuestra base de datos de postgres. Esto es una mala práctica ya que deja totalmente expuesta nuestra información. Para corregirlo, debemos crear variables de entorno e inyectarle estas variables a la conexión con la DB a través del entorno. Esto hace que nuestra aplicación sea más segura. 

Para esto creamos la carpeta `config` y creamos el archivo `config.js`. En este achivo definimos todas las variables ó parámetros que necesitamos para conectarnos con la DB, definiendolas como variables de entorno. Luego simplemente las importamos en nuestro archivo de creación de la pool de conexiones y las usamos para crear la URI de conexión.

Ahora debemos crear el archivo ``.env``. Este es un archivo muy delicado ya que tiene información sensible, por lo que gitignore lo ignora y no lo toma en cuenta para subirlo al repositorio remoto. Sin embargo, es una buena práctica crearun archivo `.env.example` para indicarle a otros programadores la manera en la que queremos que nos envíen las variables de entorno.  

Entonces, creamos el archivo `.env` y definimos todas nuestras variables de entorno con la información que antes le pasabamos al pool de conexiones. Luego, tenemos que usar la librería `dotenv` que sirve para leer las variables del archivo `.env` y las carga en el proceso de node (process).

Instalamos con `npm i dotenv`.

Y para usarla, ponemos al principio del archivo `config.js`, la siguiente línea que carga las variables del archivo `.env` en el proceso de node, para poderlas invocar como `process.env.VARIABLE`:

`require('dotenv').config()`

## Sequelize
Es una librería que nos permite optimizar aún más la conexión con la DB. Es más avanzado que la librería `pool`.

### ORM: Object Relational Model
Sirve para hacer un mapeo de la estructura de bases datos relacionales. Nos permite abstraernos de las consultas en lenguaje SQL ya que es agnóstico. Es decir, se puede usar con cualquier tipo de base de datos (Postgres, MySQL, MariaDB).

Usando Sequilize gestionamos la conexión, por lo que reemplaza a pool.

Se instala con `npm install --save sequelize`. Además también debemos instalar `npm install --save pg pg-hstore`. `pg` ya se había instalado anteriormente por lo que sólo se deberá instalar `pg-hstore`.

Debemos crear una carpeta /db con una subcarpeta /db/models, en la cual crearemos un archivo llamado `user.model.js` que nos permite crear el modelo de tabla para los usuarios.

En el index.js de la carpeta db creamos una función setupModels, a la cual le pasamos todos los modelos creamos para los distintos tipos de datos que necesitamos (categories, users, products).

Luego importamos setupModels en el archivo `sequelize.js` y ejecutamos las siguientes líneasde código, antes del `module.exports = sequelize`:

`setupModels(sequelize); sequelize.sync();`

Y en el archivo `user.service.js`, en el método `find()`, reemplazamo el uso de `sequelize` por el uso de `models.User.findAll()`. Cuando refrescamos el pgadmin nos damos cuenta que apareció una nueva tabla llamada `users`. Tiene los campos, pero no tiene ninguna columna, por lo que si hacemos una consulta de tipo GET, nos traerá un array vacío. Si le agregamos algunas filas, en Insomnia nos traerá esos datos.

Con esto ya tendremos creado nuestro primer modelo ORM y estaremos usando programacón orientadaa objetos para hacer nuestras consultas.

### Creando los CRUDS en nuestras tablas
Luego terminamos de hacer todos los CRUDS en las tablas que contemplamos para este modelo. El proceso consistió en crear el modelo en `/db/models` para cada tabla, exportarlo y usarlo en el index.js que está también en `/db/models` para pasarselo al `setupModels`. Con esto basta para que la tabla se cree en el archivo `/libs/sequelize.js` mediante las líneas `setupModels(sequelize); sequelize.sync();`, y para que luego podamos usarlo en el servicio `/services/category.service.js` como `models.Category`

### Manejando el error de campo unico generado por los modelos de base de datos
Por ejemplo, pusimos que al crear usuarios deben tener un correo unico. Si intentamos crear un usuario con un correo ya existente, nos lanzará un error que aún no tenemos gestionado. Por ende, el error nos aparece en la terminal y no en el resultado de Insomnia. 

Para esto, creamos un middleware manejador de errores de tipo ORM en los error.handlers.


### Usando MySQL
Como se mencionó antes, Sequelize es un ORM agnóstico ya que puede ser usado con cualquier tipo de base de datos. De hecho, cambiar a otra DB diferente a Postgres, con otro motor gráfico diferente a pgadmin, es relativamente sencillo.
