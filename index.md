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
He optado por la siguiente solución 
```typescript
import { access, constants, watch } from 'fs';

export const contenido_pila_llamadas: string[] = [];
export const registros_eventos_de_API: string[] = [];
export const contenido_cola_manejadores: string[] = [];

export function printInfo() {
  console.log('Pila de llamadas:', contenido_pila_llamadas);
  console.log('Registros de eventos de API:', registros_eventos_de_API);
  console.log('Cola de manejadores:', contenido_cola_manejadores);
}

console.log('Program started');
printInfo();

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
  printInfo();
} else {
  const filename = process.argv[2];

  console.log(`Accessing file ${filename}`);
  contenido_pila_llamadas.push(`Accessing file ${filename}`);
  printInfo();

  try {
    access(filename, constants.F_OK, (err) => {
      if (err) {
        console.log(`File ${filename} does not exist`);
        contenido_pila_llamadas.push(`File ${filename} does not exist`);
        printInfo();
      } else {
        console.log(`Starting to watch file ${filename}`);
        contenido_pila_llamadas.push(`Starting to watch file ${filename}`);
        printInfo();

        const watcher = watch(process.argv[2]);

        watcher.on('change', () => {
          console.log(`File ${filename} has been modified somehow`);
          registros_eventos_de_API.push(`File ${filename} has been modified somehow`);
          printInfo();
        });

        console.log(`File ${filename} is no longer watched`);
        contenido_cola_manejadores.push(`File ${filename} is no longer watched`);
        printInfo();
      }
    });
  } catch (e: any) {
    contenido_pila_llamadas.push(`Error: ${e.stack}`);
    printInfo();
    console.log('Error:', e.stack);
  }
}

console.log('Program finished');
contenido_pila_llamadas.push('Program finished');
printInfo();
``` 
Es un programa que utiliza el módulo fs para comprobar si un fichero existe. Luego se queda a la espera de que el fichero sea modificado de alguna manera.
Si el fichero no existe, se muestra un mensaje de error. Si el fichero existe, se muestra un mensaje de que se está observando el fichero y se queda a la espera de que el fichero sea modificado de alguna manera.
Cuando el fichero es modificado, se muestra un mensaje de que el fichero ha sido modificado de alguna manera.
Cuando el fichero ya no se está observando, se muestra un mensaje de que el fichero ya no se está observando.

Access es una función que se utiliza para comprobar si un fichero existe y el usuario actual tiene permisos para acceder al fichero.
Esta acepta 3 argumentos:
  - El nombre del fichero
  - Las constantes que se utilizarán para comprobar si el fichero existe
  - Una función de callback que se ejecutará cuando se haya comprobado si el fichero existe
 
 Al ejecutar el programa, se muestra un mensaje de que el programa ha comenzado, luego si se accede al fichero o no y después pone programa finalizado. Esto es porque el programa se ejecuta de forma asíncrona.
 Typescript no es un entorno bloqueante, así que como la función access es asíncrona, el programa sigue ejecutándose mientras se ejecuta la función access.

## Ejercicio 2
### Enunciado
Escriba una aplicación que proporcione información sobre el número de líneas, palabras o caracteres que contiene un fichero de texto. La ruta donde se encuentra el fichero debe ser un parámetro pasado a la aplicación desde la línea de comandos. Adicionalmente, también deberá indicarle al programa desde la línea de comandos si desea visualizar el número de líneas, palabras, caracteres o combinaciones de ellas. Puede gestionar el paso de parámetros desde la línea de comandos haciendo uso de yargs.

Lleve a cabo el ejercicio anterior de dos maneras diferentes:

- Haciendo uso del método pipe de un Stream para poder redirigir la salida de un comando hacia otro.
- Sin hacer uso del método pipe, solamente creando los subprocesos necesarios y registrando manejadores a aquellos eventos necesarios para implementar la funcionalidad solicitada.

Para lo anterior, se recomienda leer la documentación de Stream. Piense que la propiedad stdin de un objeto ChildProcess es un Stream de escritura, mientras que su propiedad stdout es un Stream de lectura.

Por último, programe defensivamente, es decir, trate de controlar los potenciales errores que podrían surgir a la hora de ejecutar su programa. Por ejemplo, ¿qué sucedería si indica desde la línea de comandos un fichero que no existe o una opción no válida?
### Resolución
#### Haciendo uso del método pipe
```typescript
import * as fs from 'fs';
import * as readline from 'readline';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

async function main() {
  const argv = await yargs(hideBin(process.argv))
    .usage('Usage: $0 [options] <filename>')
    .option('l', { alias: 'lines', describe: 'Count number of lines', type: 'boolean' })
    .option('w', { alias: 'words', describe: 'Count number of words', type: 'boolean' })
    .option('c', { alias: 'characters', describe: 'Count number of characters', type: 'boolean' })
    .demandCommand(1, 'Filename must be provided')
    .argv;

    const filename = String(argv._[0]);

  if (!fs.existsSync(filename)) {
    console.error(`File ${filename} does not exist`);
    process.exit(1);
  }

  const rl = readline.createInterface({
    input: fs.createReadStream(filename),
    crlfDelay: Infinity
  });

  let lines = 0;
  let words = 0;
  let characters = 0;

  rl.on('line', (line) => {
    lines++;
    words += line.split(' ').length;
    characters += line.length;
  });

  rl.on('close', () => {
    if (argv.lines) console.log(`Lines: ${lines}`);
    if (argv.words) console.log(`Words: ${words}`);
    if (argv.characters) console.log(`Characters: ${characters}`);
    if (!argv.lines && !argv.words && !argv.characters) {
      console.log(`Lines: ${lines}`);
      console.log(`Words: ${words}`);
      console.log(`Characters: ${characters}`);
    }
  });
}

main();
```
Lo primero que hacemos es usar la función main que he declarado como asíncrona para poder usar await en la función yargs. Esto es porque la función yargs es asíncrona y necesito esperar a que termine para poder usar los argumentos que me devuelve, porque si no se hace, se trata argv como una promesa.
Luego se comprueba si el fichero existe y si no existe, se muestra un mensaje de error y se sale del programa.
Después se crea un objeto de tipo readline.Interface que se encarga de leer el fichero línea a línea. Se le pasa como argumento un objeto de tipo fs.ReadStream que se encarga de leer el fichero.
Luego se declaran 3 variables que se encargarán de contar las líneas, palabras y caracteres. A continuación hacemos el cálculo de las líneas, palabras y caracteres.
Y por último se muestra el resultado en función de los argumentos que se le pasen al programa.

En este código si se le pasa un parámetro al comando que no existe se muestra el mensaje de help propio del yargs.
Si se le pasa un fichero que no existe se muestra un mensaje de error y se sale del programa.

#### Sin hacer uso del método pipe
```typescript
import * as fs from 'fs';
import { exec } from 'child_process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Configuramos los argumentos de línea de comandos
const argv = yargs(hideBin(process.argv))
    .option('lines', {
        alias: 'l',
        describe: 'Mostrar número de líneas',
        type: 'boolean'
    })
    .option('words', {
        alias: 'w',
        describe: 'Mostrar número de palabras',
        type: 'boolean'
    })
    .option('characters', {
        alias: 'c',
        describe: 'Mostrar número de caracteres',
        type: 'boolean'
    })
    .demandOption(['lines', 'words', 'characters'], 'Debe especificar una opción')
    .strict(false)
    .argv as any; // especificamos el tipo como any para evitar errores de tipo

const filePath = argv._[0];

// Verificamos que el archivo exista
if (!fs.existsSync(filePath)) {
    console.error(`El archivo ${filePath} no existe`);
    process.exit(1);
}

// Ejecutamos el comando wc
exec(`wc ${filePath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error al ejecutar el comando: ${error.message}`);
        process.exit(1);
    }
    if (stderr) {
        console.error(`Error al ejecutar el comando: ${stderr}`);
        process.exit(1);
    }

    // Obtenemos los valores de wc
    const [lines, words, characters] = stdout.trim().split(/\s+/);

    // Mostramos los valores requeridas
    if (argv.lines) {
        console.log(`Número de líneas: ${lines}`);
    }
    if (argv.words) {
        console.log(`Número de palabras: ${words}`);
    }
    if (argv.characters) {
        console.log(`Número de caracteres: ${characters}`);
    }
});
```
Lo primero que hacemos es configurar los argumentos de línea de comandos con yargs. En este caso, se especifica que al menos una de las opciones debe estar presente. También se especifica que no se debe mostrar un mensaje de error si se pasa un argumento que no está especificado en la configuración de yargs.

La configuración del yargs en igual a la del ejercicio anterior, pero en este caso se especifica el tipo como any para evitar errores de tipo.

Luego hacemos uso del comando ``` exec ``` en vez de ``` spawn ``` para manejar mejor los errores. Si se produce un error, se muestra un mensaje de error y se sale del programa. Si se produce un error en la ejecución del comando, se muestra un mensaje de error y se sale del programa.

Luego se obtienen los valores de wc y se muestran los valores requeridos.

## Ejercicio 3
### Enunciado
En este ejercicio tendrá que partir de la implementación de la aplicación de registro de Funko Pops que llevó a cabo en la Práctica 9 para escribir un servidor y un cliente haciendo uso de los sockets proporcionados por el módulo net de Node.js. Las operaciones que podrá solicitar el cliente al servidor deberán ser las mismas que ya implementó durante la Práctica 9, esto es, añadir, modificar, eliminar, listar y mostrar Funko Pops de un usuario concreto. Un usuario interactuará con el cliente de la aplicación, exclusivamente, a través de la línea de comandos. Al mismo tiempo, en el servidor, la información de los Funko Pops se almacenará en ficheros JSON en el sistema de ficheros, siguiendo la misma estructura de directorios utilizada durante la Práctica 9.
Descripción de los requisitos de la aplicación de registro de Funko Pops
Los requisitos que debe cumplir la aplicación son los enumerados a continuación:

1. La aplicación deberá permitir que múltiples usuarios interactúen con ella.

2. En concreto, un Funko vendrá descrito por los siguientes elementos mínimos de información que deberán ser almacenados:

    - ID. Debe ser un identificador único del Funko.
    - Nombre. Debe ser una cadena de caracteres.
    - Descripción. Debe ser una cadena de caracteres.
    - Tipo. Debe ser un enumerado con valores como, por ejemplo, Pop!, Pop! Rides, Vynil Soda o Vynil Gold, entre otros.
    - Género. Debe ser un enumerado con valores como, por ejemplo, Animación, Películas y TV, Videojuegos, Deportes, Música o Ánime, entre otras.
    - Franquicia. Debe ser una cadena de caracteres como, por ejemplo, The Big Bang Theory, Game of Thrones, Sonic The Hedgehog o Marvel: Guardians of the - Galaxy, entre otras.
    - Número. Debe ser el número identificativo del Funko dentro de la franquicia correspondiente.
    - Exclusivo. Debe ser un valor booleano, esto es, verdadero en el caso de que el Funko sea exclusivo o falso en caso contrario.
    - Características especiales. Debe ser una cadena de caracteres que indique las característica especiales del Funko como, por ejemplo, si brilla en la oscuridad o si su cabeza balancea.
    - Valor de mercado. Debe ser un valor numérico positivo.


3. Cada usuario tendrá su propia lista de Funko Pops, con la que podrá llevar a cabo las siguientes operaciones:

    - Añadir un Funko a la lista. Antes de añadir un Funko a la lista se debe comprobar si ya existe un Funko con el mismo ID. En caso de que así fuera, deberá mostrarse un mensaje de error por la consola. En caso contrario, se añadirá el nuevo Funko a la lista y se mostrará un mensaje informativo por la consola.
    
    - Modificar un Funko de la lista. Antes de modificar un Funko, previamente se debe comprobar si ya existe un Funko con el ID del Funko a modificar en la lista. Si existe, se procede a su modificación y se emite un mensaje informativo por la consola. En caso contrario, debe mostrarse un mensaje de error por la consola.
    
    - Eliminar un Funko de la lista. Antes de eliminar un Funko, previamente se debe comprobar si existe un Funko con el ID del Funko a eliminar en la lista. Si existe, se procede a su eliminación y se emite un mensaje informativo por la consola. En caso contrario, debe mostrarse un mensaje de error por la consola.
    
    - Listar los Funkos existentes en una lista. En este caso, deberá mostrarse la información asociada a cada Funko existente en la lista por la consola. Además, deberá utilizar el paquete chalk para ello. Primero, deberá establecer rangos de valor de mercado. Luego, el valor de mercado de cada Funko deberá mostrarse con colores diferentes. Por ejemplo, para aquellos Funko con un valor de mercado elevado, dicho valor deberá mostrarse en color verde, mientras que para los de menor valor de mercado, dicho valor se mostrará con color rojo. Establezca, al menos, cuatro rangos de valor de mercado diferentes.
    
    - Mostrar la información de un Funko concreto existente en la lista. Antes de mostrar la información del Funko, se debe comprobar que en la lista existe un Funko cuyo ID sea el del Funko a mostrar. Si existe, se mostrará toda su información, incluyendo el color de su valor de mercado. Para ello, use el paquete chalk. En caso contrario, se mostrará un mensaje de error por la consola.

- Todos los mensajes informativos se mostrarán con color verde, mientras que los mensajes de error se mostrarán con color rojo. Use el paquete chalk para ello.

- El servidor es responsable de hacer persistente la lista de Funko Pops de cada usuario:

  - Guardar cada Funko Pop de la lista en un fichero con formato JSON. Los ficheros JSON correspondientes a los Funko Pops de un usuario concreto deberán almacenarse en un directorio con el nombre de dicho usuario.
  
  - Cargar cada Funko Pop desde los diferentes ficheros con formato JSON almacenados en el directorio del usuario correspondiente.

1. Un usuario solo podrá interactuar con la aplicación de a través de la interfaz de línea de comandos del cliente. Los diferentes comandos, opciones de los mismos, así como manejadores asociados a cada uno de ellos deben gestionarse mediante el uso del paquete yargs.