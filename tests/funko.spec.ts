import { expect } from "chai";
import "mocha";
import { Funko, CollectibleType, CollectibleGenre } from "../src/funko.js";

describe("Funko Class Tests", () => {
  // Test case for constructor
  it("should create a new Funko object with valid input", () => {
    const funko = new Funko(
      1,
      "Harry Potter",
      "This is Harry Potter Funko Pop!",
      CollectibleType.Pop,
      CollectibleGenre.MoviesAndTV,
      "Harry Potter",
      1,
      false,
      "Glow in the dark",
      100
    );

    expect(funko.getId()).to.equal(1);
    expect(funko.getName()).to.equal("Harry Potter");
    expect(funko.getPrice()).to.equal(100);
  });

  // Test case for constructor with used id
  it("should throw an error if id is already used", () => {
    expect(() => {
      new Funko(
        1,
        "Harry Potter",
        "This is Harry Potter Funko Pop!",
        CollectibleType.Pop,
        CollectibleGenre.MoviesAndTV,
        "Harry Potter",
        2,
        false,
        "Glow in the dark",
        100
      );
    }).to.throw(Error);
  });

  // Test case for constructor with used number
  it("should throw an error if number is already used", () => {
    expect(() => {
      new Funko(
        2,
        "Hermione Granger",
        "This is Hermione Granger Funko Pop!",
        CollectibleType.Pop,
        CollectibleGenre.MoviesAndTV,
        "Harry Potter",
        1,
        false,
        "Glow in the dark",
        100
      );
    }).to.throw(Error);
  });

  // Test case for updating the funko
  it("should update the funko object with valid input", () => {
    const funko = new Funko(
      3,
      "Ron Weasley",
      "This is Ron Weasley Funko Pop!",
      CollectibleType.Pop,
      CollectibleGenre.MoviesAndTV,
      "Harry Potter",
      3,
      false,
      "Glow in the dark",
      100
    );

    funko.updateFunko(
      "New Ron Weasley",
      "This is a new Ron Weasley Funko Pop!",
      CollectibleType.Pop,
      CollectibleGenre.MoviesAndTV,
      "Harry Potter",
      4,
      false,
      "Glow in the dark",
      200
    );

    expect(funko.getId()).to.equal(3);
    expect(funko.getName()).to.equal("New Ron Weasley");
    expect(funko.getPrice()).to.equal(200);
  });
});
