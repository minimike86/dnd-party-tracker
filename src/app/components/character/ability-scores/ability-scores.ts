export class AbilityScores {

  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

  abbreviation: Map<string, string>;

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

    // define Ability Score abbreviations and long form names
    this.abbreviation = new Map;
    this.abbreviation.set('STR', 'Strength');
    this.abbreviation.set('DEX', 'Dexterity');
    this.abbreviation.set('CON', 'Constitution');
    this.abbreviation.set('INT', 'Intelligence');
    this.abbreviation.set('WIS', 'Wisdom');
    this.abbreviation.set('CHA', 'Charisma');

  }

}
