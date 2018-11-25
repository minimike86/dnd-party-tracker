export class AbilityScoreAbbreviation {
  abbreviation: Map<string, string>;
  constructor() {
    // define Ability Score abbreviations and long form names
    this.abbreviation = new Map();
    this.abbreviation.set('STR', 'Strength');
    this.abbreviation.set('DEX', 'Dexterity');
    this.abbreviation.set('CON', 'Constitution');
    this.abbreviation.set('INT', 'Intelligence');
    this.abbreviation.set('WIS', 'Wisdom');
    this.abbreviation.set('CHA', 'Charisma');
  }
}

export class AbilityScore {

  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

  constructor(strength: number,
              dexterity: number,
              constitution: number,
              intelligence: number,
              wisdom: number,
              charisma: number) {

    this.strength = strength;
    this.dexterity = dexterity;
    this.constitution = constitution;
    this.intelligence = intelligence;
    this.wisdom = wisdom;
    this.charisma = charisma;
  }

}

export function getAbilityModifier(abilityScore: number): number {
  return Math.floor(abilityScore / 2) - 5;
}
