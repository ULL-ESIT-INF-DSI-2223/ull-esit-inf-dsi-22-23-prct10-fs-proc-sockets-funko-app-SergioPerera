import { User } from "./usuario.js";

/**
 * A collection of Usuario objects
 */
export class UsuarioCollection {
  collection: User[];

  constructor(collection: User[]) {
    this.collection = collection;
  }

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
}
