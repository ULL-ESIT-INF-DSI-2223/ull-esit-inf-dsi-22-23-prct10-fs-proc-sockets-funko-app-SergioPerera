import { Funko, CollectibleGenre, CollectibleType } from "./funko.js";
import fs from "fs";

/**
 * Class representing a user
 */
export class User {
  name: string;
  surname: string;
  funkos: Funko[];

  constructor(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
    this.funkos = [];
    this.loadFunkos();
  }

  /**
   * Method that adds a Funko to the collection
   */
  public addFunko(funko: Funko): void {
    if (this.funkos.find((f) => f.getId() === funko.getId())) {
      throw new Error(
        `Funko with ID ${funko.getId()} already exists in collection with name ${
          funko.name
        } !`
      );
    }
    this.funkos.push(funko);
    this.saveFunkos();
  }

  /**
   * Method that removes a Funko from the collection
   */
  public removeFunko(id: number): void {
    /// We check if the Funko is in the collection
    if (!this.funkos.find((f) => f.id === id)) {
      throw new Error(`Funko with ID ${id} is not in the collection!`);
    }
    /// We remove the Funko from the collection
    this.funkos = this.funkos.filter((f) => f.id !== id);
    this.saveFunkos();
    fs.unlinkSync(`./database/${this.name}/${id}.json`);
  }

  /**
   * Method that gets the funkos of the user
   * @returns the funkos of the user
   */
  public getFunkos(): Funko[] {
    return this.funkos;
  }

  /**
   * Method that gets an especific funko of the user
   */
  public getFunko(id: number): Funko {
    const foundFunko = this.funkos.find((f) => f.id === id);
    if (foundFunko) {
      return foundFunko;
    } else {
      throw new Error(`Funko with ID ${id} is not in the collection!`);
    }
  }

  /**
   * Method that updates the funko of the user
   * @param id
   * @param name
   * @param description
   * @param type
   * @param genre
   * @param franchise
   * @param number
   * @param exclusive
   * @param specialFeatures
   * @param marketValue
   */
  public modifyFunko(
    id: number,
    name: string,
    description: string,
    type: CollectibleType,
    genre: CollectibleGenre,
    franchise: string,
    number: number,
    exclusive: boolean,
    specialFeatures: string,
    marketValue: number
  ): void {
    if (!this.funkos.find((f) => f.id === id)) {
      throw new Error(`Funko with ID ${id} is not in the collection!`);
    }
    const funko = this.funkos.find((f) => f.id === id);
    if (funko) {
      funko.updateFunko(
        name,
        description,
        type,
        genre,
        franchise,
        number,
        exclusive,
        specialFeatures,
        marketValue
      );
      this.saveFunkos();
    }
  }

  /**
   * Method that lists the funkos of the user
   */
  public listFunkos(): void {
    this.funkos.forEach((f) => {
      console.log(`Funko ${f.name} (${f.type})`);
      console.log(`Franchise: ${f.franchise}`);
      console.log(`Genre: ${f.genre}`);
      console.log(`Market value: ${f.marketValue}`);
    });
  }

  /**
   * Method that shows the funko of the user
   * @param id
   */
  public showFunko(id: number): void {
    const funko = this.funkos.find((f) => f.id === id);
    if (!funko) {
      throw new Error(`Funko with ID ${id} is not in the collection!`);
    }
    console.log(`Funko ${funko.name} (${funko.type})`);
    console.log(`Franchise: ${funko.franchise}`);
    console.log(`Genre: ${funko.genre}`);
    console.log(`Market value: ${funko.marketValue}`);
  }

  /**
   * Method that saves the funkos of the user
   */
  public saveFunkos(): void {
    const userDirectory = `./database/${this.name}`;

    /// Create the user directory if it does not exist
    if (!fs.existsSync(userDirectory)) {
      fs.mkdirSync(userDirectory);
    }

    /// Save the Funkos in the user directory
    this.funkos.forEach((funko) => {
      const nombreFichero = `${userDirectory}/${funko.getId()}.json`;
      const datosFunko = JSON.stringify(funko);

      fs.writeFileSync(nombreFichero, datosFunko);
    });
  }

  /**
   * Method that loads the funkos of the user
   */
  public loadFunkos(): void {
    const userDirectory = `./database/${this.name}`;

    /// Create the user directory if it does not exist
    const funkoFiles = fs.readdirSync(userDirectory);

    /// Load the Funkos from the user directory
    funkoFiles.forEach((ficheroFunko) => {
      const nombreFichero = `${userDirectory}/${ficheroFunko}`;
      const datosFunko = fs.readFileSync(nombreFichero, "utf8");
      const objetoFunko = JSON.parse(datosFunko);

      const funko = new Funko(
        objetoFunko.id,
        objetoFunko.name,
        objetoFunko.description,
        objetoFunko.type,
        objetoFunko.genre,
        objetoFunko.franchise,
        objetoFunko.number,
        objetoFunko.exclusive,
        objetoFunko.specialFeatures,
        objetoFunko.marketValue
      );

      /// Add the Funko to the collection
      this.funkos.push(funko);
    });
  }
}
