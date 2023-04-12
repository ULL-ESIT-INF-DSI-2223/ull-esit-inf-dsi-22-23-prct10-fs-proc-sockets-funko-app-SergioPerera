import {access, constants, watch} from 'fs';
import chalk from "chalk";

console.log(chalk.green('Starting program'));

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  console.log(`Accessing file ${filename}`);

  try {
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
  } catch (e: any) {
    console.log('Error:', e.stack);
  }
}

console.log('Program finished');



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
 */