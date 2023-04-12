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

