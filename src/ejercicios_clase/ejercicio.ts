import * as fs from "fs";

/**
 * Clase Mochila
 * @param capacidadMochila capacidad de la mochila
 * @param elementos elementos que se pueden meter en la mochila
 * @param leerArchivoCSV leer un archivo CSV
 * @param leerArchivoJSON leer un archivo JSON
 * @param procesar procesar un archivo
 */
export class Mochila<T extends { peso: number; beneficio: number }> {
  private capacidadMochila: number = 0;
  private elementos: T[] = [];

  constructor() {}

  /**
   * Método que lee un archivo CSV
   * @param ubicacion ubicación del archivo
   */
  private leerArchivoCSV(ubicacion: string): void {
    // Imprimimos donde estamos para saber la ruta absoluta
    // console.log(process.cwd());
    // Imprimimos la ruta del archivo
    // console.log(ubicacion);
    // Leemos de manera síncrona el archivo
    const archivo = fs.readFileSync(ubicacion, "utf-8");
    // Separamos las líneas por salto de línea
    const lineas = archivo.trim().split(/\r?\n/);
    // Imprimimos las líneas
    // console.log(lineas);
    // Cogemos la capacidad
    this.capacidadMochila = Number(lineas[0]);
    // Cogemos la cantidad de elementos
    const numElementos = Number(lineas[1]);

    // Como los elementos están de 2 en 2, empezamos en 2
    for (let i = 2; i < numElementos + 2; i++) {
      // Borramos los espacios que puedan haber por delante y por detrás, luego separamos por columnas y convertimos a número
      const [peso, beneficio] = lineas[i].trim().split(/\s+/).map(Number);
      // console.log(lineas[i].trim().split(/\s+/).map(Number));
      this.elementos.push({ peso, beneficio } as T);
    }
  }

  /**
   * Método que lee un archivo JSON
   * @param ubicacion ubicación del archivo
   */
  private leerArchivoJSON(ubicacion: string): void {
    const archivo = fs.readFileSync(ubicacion, "utf-8");
    const { capacidad, numElementos, elementos } = JSON.parse(archivo);
    this.capacidadMochila = capacidad;
    for (const elemento of elementos) {
      const { númElemento, peso, beneficio } = elemento;
      this.elementos.push({ peso, beneficio } as T);
    }
  }

  public procesar(ubicacion: string): [number[], number[]] {
    const extension = ubicacion.split(".").pop();
    switch (extension) {
      case "csv":
        this.leerArchivoCSV(ubicacion);
        break;
      case "json":
        this.leerArchivoJSON(ubicacion);
        break;
      default:
        throw new Error(`El formato del archivo ${ubicacion} no es válido`);
    }

    const beneficios: number[] = [];
    const pesos: number[] = [];
    for (const elemento of this.elementos) {
      beneficios.push(elemento.beneficio);
      pesos.push(elemento.peso);
    }
    return [beneficios, pesos];
  }
}
