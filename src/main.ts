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
