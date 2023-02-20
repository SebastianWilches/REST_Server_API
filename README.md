# Fundamentos REST API

## Modelo de la base de datos
<p align="center" style="padding: 20px; background: #252832">
    <img src="https://github.com/SebastianWilches/REST_Server_API/blob/29c97f304325827fc4bd99c6b68178e577e9e575/assets/ModeloMusicDB.png" alt="Modelo BD Rest API">
</p>

## Servicios REST
Todos los servicios de esta REST API los encontrará en la documentación generada por Postman, que la puede encontrar [aquí](https://documenter.getpostman.com/view/20804832/2s93CHvb4P)

## Middlewares
Midlewares = Van a agregar otra funcionalidad al WebServer. La palabra clave para indicar que vamos a hacer uso de esto es con 'app.use()'.

## Carpetas
### 1.Routes
Para poder mantener un código mas limpio, se van a manejar las rutas en un archivo aparte al del server. Se creara un archivo con un nombre que indique las rutas que van a manejar una función de la app.

Usaremos una funcionalidad de express conocida como "routes" para manejarlas.

### 2.Controllers
Para cumplir con el principio de responsabilidad unica, vamos a crear un controlador para las funcionalidades de las distintas peticiones HTTP (PUT, GET, POST, etc)

## Paquetes

Paquete npm CORS:
Se usara para proteger nuestro servidor API ante ciertos usuarios. En caso de no aplicarse google chrome o firefox puede mostrarnos algun error al llamar a la API.
Usos:
Restringir origenes
Crear una lista blanca o negra 

## Notas

*-* Parametros de segmento
Cuando yo estoy realizando una petición PUT o DELETE, tengo que mandarle un parametro en la URL para que sepa donde tiene que realizar los cambios, para hacer esto tengo que preparar en las rutas que voy a pasarle este parametro en el archivo que controle las rutas:
```
//PUT
router.put('/:id', userPUT);
```

Una vez hecho esto, desde el controlador de la ruta, puedo obtener esta información del request de la siguiente manera:
```
const { id } = req.params
```
*-* Query Params 
En una petición GET, dentro de la URL puedo pasarle un monton de parametros que pueden ser opcionales o no dependiendo de la API, para controlar esto lo hare desde el controlador de la ruta, y voy a desestructurar los parametros que a mi me interesen (Esto va a funcionar a modo de validación).

```
const { query, apiKey = 'a4d8w', id } = req.query;
```


TODOS los endpoint deberian ser validados, no se debe confiar en el manejo de estas desde el frontend.

Practica curso Udemy

# Despliegue con BD en Mongo BD Atlas

Para conectar nuestra aplicación con la BD en la nube vamos a usar el paquete 'Mongoose'.
La BD que estamos manejando es NO relacional, por lo tanto los archivos se graban en objetos/documentos, los cuales se graban en colecciones.

## Schema & Model

La forma en la que va a trabajar nuestro modelo de Usuarios es con Schemas y Model. El Schema sera el encargado de darle propiedades y comportamientos a nuestro documento, y el modelo sera el de compilar el Schema.
Este models de "Usuario" va a ser usado dentro del controlador userController

Fuente: https://mongoosejs.com/docs/index.html

## Encriptación de contraseña
En NINGUNA base de datos la contraseña debe estar guardada de forma abierta, ni el administrador de esta deberia verla, es por esto que es necesario encriptarla (Ej: Hash de una sola via).
Para hacer esta encriptacion se va a hacer uso del paquete de node BCryptJS.

Para encriptar una contraseña vamos a hacer uso de:
```
 const salt = bcrypt.genSaltSync(10);
```
el parametro que le pasemos a la función sera el numero de iteraciones que hara el algoritmo para aumentar la seguridad en su encriptación. (Tener en cuenta que enatre mayores iteraciones, más tiempo va a tardar). Entonces una vez tengamo9s la semilla para encriptar la contraseña, hacemos uso de la funcion hashSync y le pasamos la contraseña original y la semilla.
```
 usuario.password = bcrypt.hashSync(usuario.password, salt);
 ```

## Validación de información
Para validar la información haremos uso del paquete de express validator, que es un middleware que se ejecutara antes de disparar la condicion de POST, GET, ETC.
Dentro del archivo de las rutas de usuario, vamos a pasarle un array de middlwares, entre ellos se usara el check, el cual estara como primer parametro se la pasara el campo a revisar, y el segundo sera el mensaje.
```
check('correo', 'El correo no es valido').isEmail() 
```
Lo que va a hacer esa sentencia en ese punto es acumular en un registro todos los errores, para que yo desde el userController pueda manejar estos errores a conveniencia.
Como esta validacion la tengo que poner en cada peticion de tipo GET, POST, etc; se va a crear un middleware personalizado.

## Middlewares personalizados
Cuando yo creo un middleware puedo pasarle 3 parametros, uno de (req, res, next) el parametro de next lo necesito porque si la información pasa sin problema a traves del middleware, pasara al siguiente middleware.

## Actualizar información en mongo
Para hacer este tipo de operaciones, sera muy util hacer el uso de la función de ```Usuario.findByIdAndUpdate(id, resto)```, en la que con ayuda de un ID me va a buscar alguna coincidencia en mongo y va a actualizar con el JSON que nosotros le pasemos.

Sin embargo debo tener a cuenta algunas validaciones muy importantes para que no se rompa el programa.
1. La primera sera el de evitar recibir el parametro de _id, ya que este es el que me asigna mongo y no puedo modificarlo de esta forma. Para solucionar esto voy a hacer una desestructuración de este parametro para evitarlo enviarlo junto al "resto".
2. La segunda es revisar que el id que me estan enviando en los parametros del req sea un ID con la estructura valida para Mongo. Para esto vamos a aplicar un middleware en las rutas que nos provee Express : ```check('id','No es un ID de Mongo valido').isMongoId()```
3. La tercera es hacer una comparación del ID que me mandaron y encontrar una coincidencia en nuestra BD. Para ello vamos a hacer un custom middleware.

## Obtener usuarios
Simplemente vamos en el metodo del controlador de la petición GET, vamos a hacer una busqueda en la BD desde nuestro modelo ningun parametro especial de la siguiente forma ```const usuariosBD = await Usuario.find();```.
Pero en caso de que tengamos por ejemplo una petición GET que me traiga 10.000 usuarios es mejor hacer una paginación que ponga un intervalo en el cual limitemos los resultados.
Para ello haremos uso de dos funciones las cuales son .skip() para nuestro limite inferior y .limit() para nuestro limite superior, quedando nuestra sentencia de la siguiente forma `const usuariosBD = await Usuario.find().skip(5).limit(10)` => esto traduciria a un intervalo de [5,10].

## Eliminar usuarios
Existen dos formas de borrar usuarios:
1. La primera se encarga de borrarlo por COMPLETO de la BD, esta forma no se recomienda ya que se pierda la integrar referencial en la BD, para ello usamos la siguiente sentencia `const usuario = await Usuario.findByIdAndDelete(id);`.
2. La segunda se encarga de cambiar el estado de un usuario, para poder seguir teniendo el registro, pero si es necesario no listarlo cuando haga un get. Usaremos la siguiente sentencia ``

## Nota
La carpeta de modelos debe contener los esquemas que tengo en Mongo