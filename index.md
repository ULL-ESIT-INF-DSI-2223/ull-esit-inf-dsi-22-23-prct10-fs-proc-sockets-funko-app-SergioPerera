---
title: "Documentación de la práctica 10: Ejercicios de programación"
---
<!-- Pongo este añadido para volver al índice de un click y no tener que scrollear -->
<div style="position: fixed; bottom: 0; left: 0; background-color: #f5f5f5; border: 1px solid #ccc; padding: 10px;">
  <a href="#top">Volver al inicio</a>
</div>

# Índice
- [Ejercicios de programación](#ejercicios-de-programación)
- [Introducción](#introduccion)
  - [Ejercicio 1](#ejercicio-1)
    - [Enunciado](#enunciado)
    - [Resolución](#resolucion)
      - [Documentary](#documentaryts)
      - [Interfaces](#interfacests)
      - [Movie](#moviets)
      - [Serie](#seriets)
      - [Streamable](#streamablets)
  - [Ejercicio 2](#ejercicio-2)
    - [Enunciado](#enunciado-1)
    - [Resolución](#resolucion-1)
  - [Ejercicio 3](#ejercicio-3)
    - [Enunciado](#enunciado-2)
    - [Resolución](#resolucion-2)
  - [Ejercicio 1 clase](#ejercicio-1-clase)
- [Conclusiones](#conclusiones)

# Introducción
En esta práctica tendremos que resolver una serie de ejercicios de programación que nos permitirán conocer más en profundidad las clases e interfaces genéricas del lenguaje TypeScript. Además, también deberán utilizar los principios SOLID de diseño orientado a objetos.
# Ejercicios de programación
## Ejercicio 1
### Enunciado
Considere el siguiente ejemplo de código fuente TypeScript que hace uso del módulo fs de Node.js:
```typescript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```
En primer lugar, ejecute el programa para tratar de comprender qué hace.

A continuación, realice una traza de ejecución mostrando, paso a paso, el contenido de la pila de llamadas, el registro de eventos de la API y la cola de manejadores, además de lo que se muestra por la consola. Para ello, simule que se llevan a cabo, como mínimo, dos modificaciones del fichero helloworld.txt a lo largo de la ejecución. ¿Qué hace la función access? ¿Para qué sirve el objeto constants?

Para llevar a cabo este ejercicio, se recomienda repasar el comportamiento del bucle de eventos de Node.js haciendo uso, por ejemplo, del siguiente recurso.
### Resolución

