# Fundamentos REST API

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



Practica curso Udemy