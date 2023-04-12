import { expect } from "chai";
import "mocha";
import { Funko, CollectibleType, CollectibleGenre } from "../src/funko.js";
import { User } from "../src/usuario.js";

describe("User", () => {
  let user: User = new User("jaime", "Doe");
  let funko: Funko = new Funko(
    8,
    "Rick Sanchez",
    "Im a plickle",
    CollectibleType.Pop,
    CollectibleGenre.Animation,
    "Rick and Morty",
    1390,
    false,
    "Can fly",
    200
  );

  it("should add a new funko to the user collection", () => {
    user.addFunko(funko);
    expect(user.getFunkos()).to.contain(funko);
  });

  it("should throw an error when trying to add an existing funko", () => {
    expect(() => {
      user.addFunko(funko);
    }).to.throw(
      `Funko with ID ${funko.getId()} already exists in collection with name Rick Sanchez`
    );
  });

  it("should throw an error when trying to get a non-existing funko", () => {
    expect(() => {
      user.getFunko(12);
    }).to.throw(`Funko with ID ${12} is not in the collection!`);
  });

  it("should modify an existing funko", () => {
    const modifiedFunko = new Funko(
      9,
      "Pepe Sanchez",
      "Im a plickle",
      CollectibleType.Pop,
      CollectibleGenre.Animation,
      "Rick and Morty",
      190,
      false,
      "Can fly",
      200
    );
    user.modifyFunko(
      8,
      modifiedFunko.name,
      modifiedFunko.description,
      modifiedFunko.type,
      modifiedFunko.genre,
      modifiedFunko.franchise,
      modifiedFunko.number,
      modifiedFunko.exclusive,
      modifiedFunko.specialFeatures,
      modifiedFunko.marketValue
    );
    expect(user.getFunko(funko.getId())).to.be.not.eql(modifiedFunko);
  });

  it("should throw an error when trying to modify a non-existing funko", () => {
    expect(() => {
      user.modifyFunko(
        90,
        funko.name,
        funko.description,
        funko.type,
        funko.genre,
        funko.franchise,
        funko.number,
        funko.exclusive,
        funko.specialFeatures,
        funko.marketValue
      );
    }).to.throw(`Funko with ID 90 is not in the collection!`);
  });

  it("should remove an existing funko from the user collection", () => {
    user.removeFunko(8);
    expect(user.getFunkos()).not.to.contain(funko);
  });

  it("should throw an error when trying to remove a non-existing funko", () => {
    expect(() => {
      user.removeFunko(funko.getId());
    }).to.throw(`Funko with ID ${funko.getId()} is not in the collection!`);
  });

  it("should return the funkos of the user", () => {
    expect(user.getFunkos()).to.be.eql(user.getFunkos());
  });

  it("should return an existing funko", () => {
    expect(user.getFunko(13)).to.be.eql(user.getFunko(13));
  });
});
