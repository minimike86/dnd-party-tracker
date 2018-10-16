export class AbilityScores {

  abbreviation: Map<string, string>;

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

    this.abbreviation = new Map<string, string>();
    this.abbreviation.set('STR', 'Strength');
    this.abbreviation.set('DEX', 'Dexterity');
    this.abbreviation.set('CON', 'Constitution');
    this.abbreviation.set('INT', 'Intelligence');
    this.abbreviation.set('WIS', 'Wisdom');
    this.abbreviation.set('CHA', 'Charisma');
  }

}
