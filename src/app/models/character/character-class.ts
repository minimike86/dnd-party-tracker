export interface CharacterClassId extends CharacterClass {

  id: string;

}

export interface CharacterClass {

  name: string;
  hitDie: number;
  alignmentWhitelist: [string];
  armorProficiency: [string];
  weaponProficiency: [string];
  classSkills?: [string];
  religionRequired: boolean;
  skillPointsFirstLevel: number;
  skillPointsEachLevel: number;

}
