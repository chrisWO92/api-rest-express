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

## Docker
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
`docker ps` que es lo mismo que `docker-compose ps` pero que muestra más detalles. Dentro de estos detalles está el id de los servicios.

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