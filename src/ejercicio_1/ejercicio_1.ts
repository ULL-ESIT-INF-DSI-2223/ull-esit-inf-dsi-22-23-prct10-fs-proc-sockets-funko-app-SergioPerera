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
