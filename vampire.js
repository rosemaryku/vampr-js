class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (
      this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal
    ) {
      return true;
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {}
}

const original = new Vampire("original", 2000);
const ansel = new Vampire("ansel", 2005);
const bart = new Vampire("bart", 2005);
const rosemary = new Vampire("rosemary", 2005);
const elgort = new Vampire("elgort", 2010);
const sarah = new Vampire("sarah", 2010);
const andrew = new Vampire("andrew", 2020);

original.addOffspring(ansel);
original.addOffspring(bart);
original.addOffspring(rosemary);
ansel.addOffspring(elgort);
ansel.addOffspring(sarah);
elgort.addOffspring(andrew);

module.exports = Vampire;
