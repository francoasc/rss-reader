# Lector RSS básico

## Demo
Link: https://www.loom.com/share/221ed5784178419ba8561daf8ddc945c

## Librerias utilizadas
- `@react-navigation/native`
  - Es responsable de administrar el estado de su aplicación y vincular el Navigator de nivel superior al entorno de la aplicación.

- `@react-navigation/stack`
  - Es responsable de proporcionar una forma para que la aplicación haga la transición entre pantallas.

- `react-native-gesture-handler`
  - Proporciona una API de gestión de gestos nativas para crear las mejores experiencias táctiles posibles en React Native asi como componentes.

- `react-native-rss-parser`
  - Libreria utilizada para [parsear](https://www.alarconnelson.com/2017/11/que-es-parseo-parsing.html) el XML

- `axios`
  - Utilizada para hacer las peticiones de los diferentes XML.

-  `react-native-safe-area-context`
   - Proporciona una API flexible para acceder a la información del área segura del dispositivo. Esto sirvió para evitar la colisión de la interfaz de los dispositivos móviles

 - `react-redux | @reduxjs/toolkit`
   - Framework para manejo global del estado en conjunto con `@reduxjs/toolkit` debido a las fuertes recomendaciones de `redux` a usarlo

- `@react-native-async-storage/async-storage`
  - Usado para el almacenamiento serializado de datos en el dispositivo para que los mismos puedan persistir en el cierre de la aplicación

- `TypeScript`
- JavaScript con esteroides, ayuda mucho con los tipados y posibles errores en el desarrollo de la aplicación además de un escalado futuro de la misma.

## Arquitectura
- Basicamente use este patron por experiencia y porque es muy cómodo de usar, al haber sido una aplicación pequeña no pude usar otro tipo de arquitectura como lo hubiera hecho para un proyecto grande pero funciona muy bien y tiene la posibilidad de escalado futuro.

```
src
 |
 |-- app
 |    |
 |    |-- hooks...
 |
 |-- redux
 |    |
 |    |-- reducers
 |    |-- store
 |
 |-- components
 |    |
 |    |-- componente reutilizable
 |          |
 |          |-- componente, estlios index
 |
 |
 |-- screens
 |    |
 |    |-- screen1
 |    |     |
 |    |     |-- componente, estilos, index
 |    |
 |    |-- screen2
 |    |-- n
 |
 |-- utils
 |    |
 |    |-- funciones reutilizables en toda la aplicacion (fechas, operaciones, etc...)
 |
 |-- routeComponentMap y routeNames para un mejor escalado y orden de navegacion de las pantallas
 
```
