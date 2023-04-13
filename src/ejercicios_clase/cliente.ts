import net from 'net';

export function cliente(callback: (err: string | undefined, data: string | undefined) => void) {

  // Comprobamos que se ha introducido un comando
  if (process.argv.length < 3) {
    const errorMsg = "Error: No se ha introducido ningun comando";
    // console.log(errorMsg);
    return callback(errorMsg, undefined);
  }

  /**
   * Creamos y conectamos el cliente
   */
  const client = net.connect({ port: 8100 });

  /**
   * Cuando se conecta el cliente, enviamos un mensaje al servidor
   */
  client.on('connect', () => {
    // Ahora mandamos al servidor el comando y el parametro
    client.write(JSON.stringify({ 'type': 'command', 'com': process.argv[2], 'param': process.argv[3] }));
  });

  /**
   * Cuando recibimos datos del servidor, los pasamos al callback
   */
  client.on('data', (data) => {
    const response = data.toString();
    client.end();
    return callback(undefined, response);
  });

  /**
   * Cuando se cierra la conexion, mostramos un mensaje por pantalla y pasamos el mensaje al callback
   */
  client.on('close', () => {
    const successMsg = "Cliente desconectado";
    // console.log(successMsg);
    return callback(undefined, successMsg);
  });

}

// Generamos una función que albergue los comandos y a la que le pasamos los argumentos
export function comandos() {
  let incomandos = process.argv[2];
  let inparametros = process.argv[3];

  // Creamos un array con los comandos ls y pwd
  let comandos = ['ls', 'pwd'];
  // Creamos un array con los parametros de ls
  let parametros_ls = ['-l', '-a'];
  // Creamos un array con los parametros de pwd
  let parametros_pwd = [''];

  // Comprueba que el comando introducido es ls o pwd
  if (!comandos.includes(incomandos)) {
    if(!parametros_ls.includes(inparametros) || !parametros_pwd.includes(inparametros)) {
      console.log('Error: No se ha introducido ningun comando');
      return('Error: No se ha introducido ningun comando');
    }
  }
}

// Llamamos a la función cliente y pasamos un callback para manejar la respuesta
cliente((err, data) => {
  if (err) {
    console.log(err);
  } else if (data) {
    console.log(data);
  }
});
