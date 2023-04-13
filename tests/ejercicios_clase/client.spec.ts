import 'mocha';
import { expect } from 'chai';
import { cliente, comandos } from '../../src/ejercicios_clase/cliente.js';

describe('cliente function tests', () => {
  it('should return an error if no command is provided', (done) => {
    /// usamos la función comandos, para comprobar si los comandos son correctos
    const comando = comandos();
    expect(comando).to.equal('Error: No se ha introducido ningun comando');
  });
  
  // it('should return a success message when the client disconnects', (done) => {
  //   cliente((error, data) => {
  //     expect(error).to.be.undefined;
  //     expect(data).to.equal('Cliente desconectado');
  //     done();
  //   });
  // });
});
