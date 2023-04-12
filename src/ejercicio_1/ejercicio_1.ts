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



// import {access, constants, watch} from 'fs';

// /// Comprobamos que hayan 3 argumentos, es decir, que se haya pasado un fichero
// if (process.argv.length !== 3) {
//   console.log('Please, specify a file');
// } else {
//   /// Obtenemos el nombre del fichero
//   const filename = process.argv[2];

//   /// Comprobamos que el fichero existe
//   access(filename, constants.F_OK, (err) => {
//     /// Si no existe, mostramos un mensaje de error
//     if (err) {
//       console.log(`File ${filename} does not exist`);
//     } else {
//       console.log(`Starting to watch file ${filename}`);

//       const watcher = watch(process.argv[2]);

//       watcher.on('change', () => {
//         console.log(`File ${filename} has been modified somehow`);
//       });

//       console.log(`File ${filename} is no longer watched`);
//     }
//   });
// }
/**
 * Es un programa que utiliza el módulo fs para comprobar si un fichero existe. Luego se queda a la espera de que el fichero sea modificado de alguna manera.
 * Si el fichero no existe, se muestra un mensaje de error. Si el fichero existe, se muestra un mensaje de que se está observando el fichero y se queda a la espera de que el fichero sea modificado de alguna manera.
 * Cuando el fichero es modificado, se muestra un mensaje de que el fichero ha sido modificado de alguna manera.
 * Cuando el fichero ya no se está observando, se muestra un mensaje de que el fichero ya no se está observando.
 * 
 * Access es una función que se utiliza para comprobar si un fichero existe y el usuario actual tiene permisos para acceder al fichero.
 * Esta acepta 3 argumentos:
 *    - El nombre del fichero
 *    - Las constantes que se utilizarán para comprobar si el fichero existe
 *    - Una función de callback que se ejecutará cuando se haya comprobado si el fichero existe
 * 
 * Al ejecutar el programa, se muestra un mensaje de que el programa ha comenzado, luego si se accede al fichero o no y después pone programa finalizado. Esto es porque el programa se ejecuta de forma asíncrona.
 * Typescript no es un entorno bloqueante, así que como la función access es asíncrona, el programa sigue ejecutándose mientras se ejecuta la función access.
 */