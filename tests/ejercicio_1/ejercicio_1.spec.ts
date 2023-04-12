// import { expect } from 'chai';
// import { access, constants, watch } from 'fs';
// import { contenido_pila_llamadas, registros_eventos_de_API, contenido_cola_manejadores, printInfo } from '../../src/ejercicio_1/ejercicio_1.js';

// describe('ejercicio_1', function() {
//   it('should print "Please, specify a file" if no file is specified', function(done) {
//     const expectedOutput = [
//       "Program started\n",
//       "Pila de llamadas: []\n",
//       "Registros de eventos de API: []\n",
//       "Cola de manejadores: []\n",
//       "Please, specify a file\n",
//       "Pila de llamadas: []\n",
//       "Registros de eventos de API: []\n",
//       "Cola de manejadores: []\n",
//       "Program finished\n",
//       "Pila de llamadas: [ 'Program finished' ]\n",
//       "Registros de eventos de API: []\n",
//       "Cola de manejadores: []\n"
//     ];

//     process.argv = ['node', 'ejercicio_1.js'];

//     const stdout = require('test-console').stdout;
//     const inspect = stdout.inspect();

//     printInfo();

//     inspect.restore();

//     const actualOutput = inspect.output.join('').split('\n');
//     actualOutput.pop();

//     expect(actualOutput).to.deep.equal(expectedOutput);

//     done();
//   });

//   it('should print information when a file is specified', function(done) {
//     const expectedOutput = [      'Accessing file test.txt',      'Starting to watch file test.txt',      'File test.txt is no longer watched',      'Program finished'    ];

//     const originalConsoleLog = console.log;
//     console.log = function mockedConsoleLog(...args: any[]) {
//       expect(args).to.eql(expectedOutput.shift());
//       if (expectedOutput.length === 0) {
//         console.log = originalConsoleLog;
//         done();
//       }
//     }

//     process.argv = ['node', 'ejercicio_1.js', 'test.txt'];

//     printInfo();
//   });

//   it('should print "File does not exist" if an invalid file is specified', function(done) {
//     const expectedOutput = ['File test2.txt does not exist'];

//     const originalConsoleLog = console.log;
//     console.log = function mockedConsoleLog(...args: any[]) {
//       expect(args).to.eql(expectedOutput);
//       console.log = originalConsoleLog;
//       done();
//     }

//     process.argv = ['node', 'ejercicio_1.js', 'test2.txt'];

//     printInfo();
//   });
// });