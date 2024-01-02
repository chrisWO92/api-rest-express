# API REST CON EXPRESS JS
Primero que todo se ejecuta el comando npm init -y y el comando git init.
También se crean los archivos .gitignore, .editorconfig y .eslintrc.json,
que son usados para definir parámetros del entorno de desarrollo.

Luego se deben definir los contenidos de estos archivos, que serán objetos
entre llaves {} con una serie de pares llave-valor que definen parámetros para
nuestro entorno de desarrollo.

En el package.json definimos unos comandos para correr nodemon cuando usamos el
comando "npm run dev", y debemos también instalar nodemon y otras configuraciones
eslint de prettier que nos permitirán trabajar mejor.

Estas caracterísitcas las tenemos con el siguiente comando:

npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier pritter -D

## REST: Representational State Transfer

GET: obtener info
PUT: Modificaciones
PATCH: Actualización de productos particulares
POST: Creación
DELETE: Eliminación

### GET
Los endpoints tipo GET deberían apuntar a rutas del tipo /products/{id}, es decir,
que antes de apuntar al producto específico, debemos pasar por el conjunto de
productos cuyo nombre debe estar en plural.

## SINGLE RESPONSABILITY PRINCIPLE
Cada trozo de código debería tener una sóla función o responsabilidad.

## BOOM
Se instala como npm i @hapi/boom
Sirve para manejar los tipos de errores.
En esta aplicacion, boom se usa en el product.service.js para emitir un error cuando se intenta encontrar
un producto pero el id no existe. Por ende, también se envían errores de tipo boom cuando se quiere actualizar,
y cuando se quiere borrar un producto.

## JOI
Siempre que le vamos a enviar datos al servidor a través de requests debemos asegurarnos
de que el formato de estos datos es el correcto. Para eso se usa JOI, para validar si los
datos que enviamos al servidor tienen las características que deben tener.
npm i joi

## CONSIDERACIONES PARA PRODUCCIÓN
Antes de enviar a producción debemos tener ciertas consideraciones:

- CORS: Cross Origin Resource Sharing. Es un problema que debemos contemplar antes de hacer deploy. La petición de datos a nuestra aplicación desde distintos orígenes debe ser funcional y no generar errores.
- Https: debemos asegurarnos que funciona en https y no en http, por temas de seguridad.
- Procesos de build: debemos asegurarnos que los procesos de building esten corriendo bien.
- Remover logs: remover los logs de nuestra aplicación ya que no es bien visto que estén en el entregable final.
- Seguridad (Helmet): Helmet es un middleware que nos ayuda a configurar la seguridad de la aplicación.
- Testing: Hacer testings unitarios para asegurarnos que todo está bien.

### Problema de CORS
npm i cors
Debemos instalarlo y llamarlo en nuestra aplicación, en el index.js. Podemos optar por darle acceso a todos los orígenes
que se quieran conectar, en caso que seamos una API pública, o podemos definir ciertos orígenes permitidos para que sólo esos puedan obtener la información.

## Deployment a Heroku
Debemos crear una cuenta en Heroku y luego seguir los pasos que están descritos en la documentación de Heroku.


