const common = require("mocha/lib/interfaces/common");

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

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name

  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
    for (const vampire of this.offspring) {
      const found = vampire.vampireWithName(name);
      if (found) {
        return found;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let descendents = 0;
    if (this.offspring) {
      for (const vampire of this.offspring) {
        descendents += 1 + vampire.totalDescendents;
      }
    }
    return descendents;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let convertedVampires = [];
    if (this.yearConverted > 1980) {
      convertedVampires.push(this);
    }
    if (this.offspring) {
      for (const vampire of this.offspring) {
        const vampiresMillenials = vampire.allMillennialVampires;
        convertedVampires = convertedVampires.concat(vampiresMillenials);
      }
    }
    return convertedVampires;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (!this.creator) {
      return this;
    }

    if (this === vampire) {
      return this;
    }

    const thisAncestors = new Set();
    const vampireAncestors = new Set();
    let currentThis = this;
    let currentVampire = vampire;

    while (currentThis.creator) {
      thisAncestors.add(currentThis.creator);
      currentThis = currentThis.creator;
    }

    while (currentVampire.creator) {
      vampireAncestors.add(currentVampire.creator);
      currentVampire = currentVampire.creator;
    }

    const intersection = [];
    for (let el of vampireAncestors) {
      if (thisAncestors.has(el)) {
        intersection.push(el);
      }
    }
    if (intersection[0].offspring.length === 1) {
      return intersection[0].offspring[0];
    }
    return intersection[0];
  }
}

module.exports = Vampire;
