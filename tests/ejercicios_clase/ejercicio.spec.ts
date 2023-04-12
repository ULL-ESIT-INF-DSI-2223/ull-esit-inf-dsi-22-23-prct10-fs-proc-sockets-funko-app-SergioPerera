import { expect } from "chai";
import "mocha";
import { Mochila } from "../../src/ejercicios_clase/ejercicio.js";

describe("Mochila", function () {
  const mochila = new Mochila();

  describe("procesar", function () {
    it("debería leer un archivo CSV correctamente", function () {
      const ubicacion = "./input/csvTest.csv";
      const [beneficios, pesos] = mochila.procesar(ubicacion);
      expect(beneficios).to.eql([20, 10, 25, 8, 35]);
      expect(pesos).to.eql([10, 5, 12, 6, 15]);
    });

    it("debería leer un archivo JSON correctamente", function () {
      const ubicacion = "./input/jsonTest.json";
      const [beneficios, pesos] = mochila.procesar(ubicacion);
      expect(beneficios).to.eql([20, 10, 25, 8, 35, 20, 10, 25]);
      expect(pesos).to.eql([10, 5, 12, 6, 15, 10, 5, 12]);
    });

    it("debería lanzar un error si el formato del archivo no es válido", function () {
      const ubicacion = "./test/invalidTest.txt";
      expect(() => mochila.procesar(ubicacion)).to.throw(
        "El formato del archivo"
      );
    });
  });
});
