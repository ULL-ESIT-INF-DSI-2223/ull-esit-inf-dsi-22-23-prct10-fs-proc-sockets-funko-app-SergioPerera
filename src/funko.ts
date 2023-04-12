// Enum for different types of collectibles
export enum CollectibleType {
  Pop = "Pop!",
  PopRides = "Pop! Rides",
  VinylSoda = "Vinyl Soda",
  VinylGold = "Vinyl Gold",
}

// Enum for different genres of collectibles
export enum CollectibleGenre {
  Animation = "Animation",
  MoviesAndTV = "Movies and TV",
  VideoGames = "Video Games",
  Sports = "Sports",
  Music = "Music",
  Anime = "Anime",
}

let usedIDs: number[] = [];
let usedNumbers: number[] = [];

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

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.marketValue;
  }

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
