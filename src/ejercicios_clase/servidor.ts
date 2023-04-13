// import net from 'net';
// import { spawn } from 'child_process';

// export function servidor() {
//   let returned_msg: string = "";

//   /**
//    * Generamos el servidor
//    */
//   net.createServer((connection) => {
//     /// Cuando se conecta un cliente, mostramos un mensaje por pantalla
//     connection.on('data', (data) => {
//       /// Parseamos el mensaje recibido
//       let mensaje = JSON.parse(data.toString());
  
//       /// Si el mensaje es un comando, lo ejecutamos
//       if(mensaje.type == 'command') {
//         console.log("Se ejecutara el comando: " + mensaje.com + " " + mensaje.param);
//         let salida;
//         /// Si no se ha introducido un parametro, ejecutamos el comando sin parametro
//         if(mensaje.param == undefined) {
//           salida = spawn(mensaje.com);
//         } else {
//           salida = spawn(mensaje.com, [mensaje.param]);
//         }
  
//         /// Cuando se recibe la salida del comando, la enviamos al cliente
//         salida.stderr.on('data', (data) => {
//           connection.write(data.toString());
//         });
  
//         /// Cuando se recibe la salida del comando, la enviamos al cliente
//         salida.stdout.on('data', (data) => {
//           connection.write(data.toString());
//         });
//       }
//     });
  
//     /// Cuando se cierra la conexion, mostramos un mensaje por pantalla
//     connection.on('close' , () => {
//       console.log('Cliente desconectado');
//       return ("Cliente desconectado");
//     });
    
//   }).listen(8100, () => {
//       console.log('Servidor escuchando en el puerto 8100');
//     });
// }

// servidor();

import net from 'net';
import { spawn } from 'child_process';

export function servidor(callback: (msg: string) => void) {
  let returned_msg: string = "";
  
  /**
   * Generamos el servidor
   */
  net.createServer((connection) => {
    /// Cuando se conecta un cliente, mostramos un mensaje por pantalla
    connection.on('data', (data) => {
      /// Parseamos el mensaje recibido
      let mensaje = JSON.parse(data.toString());
  
      /// Si el mensaje es un comando, lo ejecutamos
      if(mensaje.type == 'command') {
        console.log("Se ejecutara el comando: " + mensaje.com + " " + mensaje.param);
        let salida;
        /// Si no se ha introducido un parametro, ejecutamos el comando sin parametro
        if(mensaje.param == undefined) {
          salida = spawn(mensaje.com);
        } else {
          salida = spawn(mensaje.com, [mensaje.param]);
        }
  
        /// Cuando se recibe la salida del comando, la enviamos al cliente
        salida.stderr.on('data', (data) => {
          connection.write(data.toString());
        });
  
        /// Cuando se recibe la salida del comando, la enviamos al cliente
        salida.stdout.on('data', (data) => {
          connection.write(data.toString());
        });
      }
    });
  
    /// Cuando se cierra la conexion, mostramos un mensaje por pantalla
    connection.on('close' , () => {
      // console.log('Cliente desconectado');
      returned_msg = "Cliente desconectado";
      callback(returned_msg);
    });
    
  }).listen(8100, () => {
      // console.log('Servidor escuchando en el puerto 8100');
      returned_msg = "Servidor escuchando en el puerto 8100";
      callback(returned_msg);
    });
}

servidor((msg) => {
  console.log(msg);
});
