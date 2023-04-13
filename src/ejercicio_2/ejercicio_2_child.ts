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

