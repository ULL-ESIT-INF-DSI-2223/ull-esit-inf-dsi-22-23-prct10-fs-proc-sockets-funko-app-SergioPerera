import net from 'net';

/**
 * Creamos y conectamos el cliente 
 */
const client = net.connect({port: 8100});

/**
 * Cuando se conecta el cliente, enviamos un mensaje al servidor
 */
client.on('connect' , () => {
  /// Comprobamos que se ha introducido un comando
  if (process.argv.length < 3) { 
    console.log("Error: No se ha introducido ningun comando");
    process.exit(1);
  }
  /// Ahora mandamos al servidor el comando y el parametro
  client.write(JSON.stringify({'type': 'command', 'com': process.argv[2], 'param': process.argv[3]}));
});

/**
 * Cuando recibimos datos del servidor, los mostramos por pantalla
 */
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});

/**
 * Cuando se cierra la conexion, mostramos un mensaje por pantalla  
 */
client.on('close', () => {
  console.log('Cliente desconectado');
});