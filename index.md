---
title: "Documentación de la práctica 6: Ejercicios de programación"
---
<!-- Pongo este añadido para volver al índice de un click y no tener que scrollear -->
<div style="position: fixed; bottom: 0; left: 0; background-color: #f5f5f5; border: 1px solid #ccc; padding: 10px;">
  <a href="#top">Volver al inicio</a>
</div>

# Índice
- [Introducción](#introducción)
- [Estructura](#estructura)
- [Clases](#clases)
  - [Clase ``` userCollection```](#clase-usercollection)
  - [Clase ``` usuario```](#clase-usuario)
  - [Clase ``` funko```](#clase-funko)
- [Conclusiones](#conclusiones)


# Introducción
En esta práctica, tendrá que implementar una aplicación que permita almacenar información de los Funko Pops pertenecientes a la colección de un usuario. En concreto, el sistema permitirá añadir, modificar, eliminar, listar y leer la información asociada a un Funko. La información de cada Funko se almacenará como un JSON en el sistema de ficheros de la máquina donde se ejecute la aplicación. Además, solo se podrá interactuar con la aplicación desde la línea de comandos (no existirá un menú interactivo).

# Estructura
He decidido que la estructura de la aplicación sea la siguiente:
![Estructura de la aplicación](media/abc.png)

Como podemos ver en la imagen, la clase ``` userCollection``` va a a contener a la clase ``` usuario``` y esta a su vez va a tener como atributo un array de ``` funko```.
# Clases
## Clase ``` userCollection```
Esta se encarga de almacenar a todos los usuarios del sistema, la he implementado de la siguiente forma;
```typescript
/**
 * A collection of Usuario objects
 */
export class UsuarioCollection {
  collection: User[];

  constructor(collection: User[]) {
    this.collection = collection;
  }
```
He creado un atributo privado que consiste en un array de ``` usuario```. Además, he creado un constructor que recibe un array de ``` usuario``` y lo asigna al atributo privado. Luego he ido creando los distintos métodos que se encargan de manejar la información del array de usuarios:
```typescript
/**
   * Method that adds a Usuario to the collection
   * @param usuario The Usuario to add to the collection
   */
  public addUser(usuario: User): void {
    /// We first check if the Usuario is already in the collection
    if (this.collection.find((u) => u.name === usuario.name)) {
      throw new Error(`Usuario ${usuario.name} is already in the collection!`);
    }
    this.collection.push(usuario);
  }

  /**
   * Method that removes a Usuario from the collection
   * @param usuario
   */
  public removeUsuario(usuario: User): void {
    /// We check if the Usuario is in the collection
    if (!this.collection.find((u) => u.name === usuario.name)) {
      throw new Error(`Usuario ${usuario.name} is not in the collection!`);
    }
    this.collection = this.collection.filter((u) => u.name !== usuario.name);
  }

  /**
   * Method that returns the collection of Usuario objects
   * @returns The collection of Usuario objects
   */
  public getUsers(): User[] {
    return this.collection;
  }

  /**
   * Method that returns a Usuario object from the collection
   * @param nombre
   * @returns
   */
  public getUser(name: string): User {
    const usuario = this.collection.find((u) => u.name === name);
    if (usuario) {
      return usuario;
    } else {
      throw new Error(`El usuario ${name} no existe en la colección.`);
    }
  }
```
## Clase ``` usuario```
Esta clase se encarga de almacenar la información de un usuario, así como la información de los funkos que tiene agregados. La he implementado de la siguiente forma:
```typescript
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
```
He creado un atributo privado que consiste en un array de ``` funko```. Además, he creado un constructor que recibe el nombre y el apellido del usuario y lo asigna a los atributos privados. Luego he ido creando los distintos métodos que se encargan de manejar la información del array de funkos:
```typescript
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
```
Siendo los métodos más comlejos los de ``` loadFunkos() ``` y ``` saveFunkos() ``` que se encargan de cargar y guardar los Funkos de la colección del usuario respectivamente. Para ello, se crea un directorio con el nombre del usuario en el que se guardan los Funkos en formato JSON. Para ello, se utiliza la librería ``` fs ``` de Node.js de manera síncrona
## Clase ```funko```
Esta clase se encarga de almacenar toda la información correspondiente a un funko, la he implementado de la siguiente manera:
```typescript
export class Funko {
  id: number;
  name: string;
  description: string;
  type: CollectibleType;
  genre: CollectibleGenre;
  franchise: string;
  number: number;
  exclusive: boolean;
  specialFeatures: string;
  marketValue: number;

  constructor(
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
  ) {
    if (usedIDs.includes(id)) {
      throw new Error(`ID ${id} is already in use!`);
    }
    this.id = id;
    usedIDs.push(id);

    this.name = name;
    this.description = description;
    this.type = type;
    this.genre = genre;
    this.franchise = franchise;

    if (usedNumbers.includes(number)) {
      throw new Error(`Number ${number} is already in use!`);
    }
    this.number = number;
    usedNumbers.push(number);

    this.exclusive = exclusive;
    this.specialFeatures = specialFeatures;
    this.marketValue = marketValue;
  }
```
Como se puede observar, se utiliza un array de números que se encarga de almacenar los IDs que ya han sido utilizados para evitar que se repitan. De la misma manera, se utiliza otro array para almacenar los números de los Funkos que ya han sido utilizados. Esto se hace para evitar que se repitan los números de los Funkos y que se puedan identificar de manera única.

Después tenemos los métodos ``` updateFunko() ``` y los distintos ``` getters ``` que se encargan de actualizar los datos de un Funko.
```typescript
  /**
   * Method that updates the funko
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
  public updateFunko(
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
    this.name = name;
    this.description = description;
    this.type = type;
    this.genre = genre;
    this.franchise = franchise;
    this.number = number;
    this.exclusive = exclusive;
    this.specialFeatures = specialFeatures;
    this.marketValue = marketValue;
  }
}
```
## Main
En el main se encarga de crear un usuario y de añadirle Funkos a su colección. Para ello, se utiliza la librería ``` readline-sync ``` para poder leer los datos introducidos por el usuario.
```typescript
import { User } from "./usuario.js";
import { Funko } from "./funko.js";
import { CollectibleType } from "./funko.js";
import { CollectibleGenre } from "./funko.js";
import { UsuarioCollection } from "./userCollection.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";

/// Creamos varios usuarios
const usuario = new User("pablo", "Garcia");
const usuario2 = new User("jaime", "Garcia");
const usuario3 = new User("jose", "Garcia");

/// Creo una colección de usuarios
const userCollection = new UsuarioCollection([usuario, usuario2, usuario3]);

function getCollectibleType(typeName: string): CollectibleType {
  for (const type of Object.values(CollectibleType)) {
    if (type === typeName) {
      return type;
    }
  }
  throw new Error(chalk.red(`Invalid collectible type: ${typeName}`));
}

function getCollectibleGenre(genreName: string): CollectibleGenre {
  for (const genre of Object.values(CollectibleGenre)) {
    if (genre === genreName) {
      return genre;
    }
  }
  throw new Error(chalk.red(`Invalid collectible genre: ${genreName}`));
}

// Set up command line arguments using yargs
yargs(hideBin(process.argv))
  .command(
    "add",
    "Add a new Funko to a user collection",
    {
      user: {
        describe: "The name of the user",
        demandOption: true,
        type: "string",
      },
      id: {
        describe: "The ID of the Funko",
        demandOption: true,
        type: "number",
      },
      name: {
        describe: "The name of the Funko",
        demandOption: true,
        type: "string",
      },
      desc: {
        describe: "The description of the Funko",
        demandOption: true,
        type: "string",
      },
      type: {
        describe: "The type of the Funko",
        demandOption: true,
        choices: ["Pop!", "Pop! Rides", "Vinyl Soda", "Vinyl Gold"],
        type: "string",
      },
      genre: {
        describe: "The genre of the Funko",
        demandOption: true,
        choices: [
          "Animation",
          "Movies and TV",
          "Video Games",
          "Sports",
          "Music",
          "Anime",
        ],
        type: "string",
      },
      franchise: {
        describe: "The franchise of the Funko",
        demandOption: true,
        type: "string",
      },
      number: {
        describe: "The number of the Funko",
        demandOption: true,
        type: "number",
      },
      exclusive: {
        describe: "The exclusive of the Funko",
        demandOption: true,
        type: "boolean",
      },
      specialFeatures: {
        describe: "The special features of the Funko",
        demandOption: true,
        type: "string",
      },
      price: {
        describe: "The price of the Funko",
        demandOption: true,
        type: "number",
      },
    },
    (argv) => {
      try {
        // Create a new Funko object with the specified arguments
        const newFunko = new Funko(
          argv.id,
          argv.name,
          argv.desc,
          getCollectibleType(argv.type),
          getCollectibleGenre(argv.genre),
          argv.franchise,
          argv.number,
          argv.exclusive,
          argv.specialFeatures,
          argv.price
        );
        userCollection.getUser(argv.user).addFunko(newFunko);
      } catch (error) {
        if (error instanceof Error) {
          console.log(chalk.red(error.message));
          return;
        }
      }
      console.log(chalk.green(`New Funko added to ${argv.user} collection!`));
    }
  )
  .command(
    "remove",
    "Remove a Funko from a user collection",
    {
      user: {
        describe: "The name of the user",
        demandOption: true,
        type: "string",
      },
      id: {
        describe: "The ID of the Funko",
        demandOption: true,
        type: "number",
      },
    },
    (argv) => {
      try {
        userCollection.getUser(argv.user).removeFunko(argv.id);
      } catch (error) {
        if (error instanceof Error) {
          console.log(chalk.red(error.message));
          return;
        }
      }
      console.log(chalk.green(`Funko removed from ${argv.user} collection!`));
    }
  )
  .command(
    "list",
    "List all Funkos in a user collection",
    {
      user: {
        describe: "The name of the user",
        demandOption: true,
        type: "string",
      },
    },
    (argv) => {
      const funkos = userCollection.getUser(argv.user).getFunkos();
      console.log(chalk.green(`Funkos in ${argv.user} collection:`));

      const orange = chalk.hex("#FFA500");
      for (const funko of funkos) {
        const price = funko.getPrice();
        if (price >= 0 && price < 10) {
          console.log(chalk.green(funko.getName()));
        } else if (price >= 10 && price < 20) {
          console.log(chalk.yellow(funko.getName()));
        } else if (price >= 20 && price < 30) {
          console.log(orange(funko.getName()));
        } else {
          console.log(chalk.red(funko.getName()));
        }
      }
    }
  )
  .command(
    "show",
    "Show a Funko from a user collection",
    {
      user: {
        describe: "The name of the user",
        demandOption: true,
        type: "string",
      },
      id: {
        describe: "The ID of the Funko",
        demandOption: true,
        type: "number",
      },
    },
    (argv) => {
      const funko = userCollection.getUser(argv.user).getFunko(argv.id);
      console.log(chalk.green(`Funko in ${argv.user} collection:`));
      console.log(chalk.green(funko));
    }
  )
  .command(
    "modify",
    "Modify a Funko from a user collection",
    {
      user: {
        describe: "The name of the user",
        demandOption: true,
        type: "string",
      },
      id: {
        describe: "The ID of the Funko",
        demandOption: true,
        type: "number",
      },
      name: {
        describe: "The name of the Funko",
        demandOption: true,
        type: "string",
      },
      desc: {
        describe: "The description of the Funko",
        demandOption: true,
        type: "string",
      },
      type: {
        describe: "The type of the Funko",
        demandOption: true,
        choices: ["Pop!", "Pop! Rides", "Vinyl Soda", "Vinyl Gold"],
        type: "string",
      },
      genre: {
        describe: "The genre of the Funko",
        demandOption: true,
        choices: [
          "Animation",
          "Movies and TV",
          "Video Games",
          "Sports",
          "Music",
          "Anime",
        ],
        type: "string",
      },
      franchise: {
        describe: "The franchise of the Funko",
        demandOption: true,
        type: "string",
      },
      number: {
        describe: "The number of the Funko",
        demandOption: true,
        type: "number",
      },
      exclusive: {
        describe: "The exclusive of the Funko",
        demandOption: true,
        type: "boolean",
      },
      specialFeatures: {
        describe: "The special features of the Funko",
        demandOption: true,
        type: "string",
      },
      price: {
        describe: "The price of the Funko",
        demandOption: true,
        type: "number",
      },
    },
    (argv) => {
      try {
        userCollection
          .getUser(argv.user)
          .modifyFunko(
            argv.id,
            argv.name,
            argv.desc,
            getCollectibleType(argv.type),
            getCollectibleGenre(argv.genre),
            argv.franchise,
            argv.number,
            argv.exclusive,
            argv.specialFeatures,
            argv.price
          );
      } catch (error) {
        if (error instanceof Error) {
          console.log(chalk.red(error.message));
          return;
        }
      }
      console.log(chalk.green(`Funko modified from ${argv.user} collection!`));
    }
  )
  .help()
  .alias("help", "h").argv;
```
Se ha utilizado la librería ``` yargs``` junto con ``` chalk``` para realizar un menú de comandos que permita al usuario interactuar con la aplicación. El menú de comandos permite al usuario crear, eliminar, listar, mostrar y modificar Funkos de una colección de un usuario. Para ello, se ha utilizado la librería ``` yargs``` para crear los comandos y sus argumentos, y ``` chalk``` para darle color a los mensajes que se muestran por consola.

# Conclusiones
En esta práctica se ha realizado una aplicación que permite al usuario crear, eliminar, listar, mostrar y modificar Funkos de una colección de un usuario. Para ello, se ha utilizado la librería ``` yargs``` para crear los comandos y sus argumentos, y ``` chalk``` para darle color a los mensajes que se muestran por consola. La complicación más grande estuvo a la hora de usar la librería fsync para poder crear una permanencia de datos