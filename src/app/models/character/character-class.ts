export interface CharacterClassId extends CharacterClass {

  id: string;

}

export interface CharacterClass {

  name: string;
  hitDie: number;
  startingAgeType: string;
  alignmentWhitelist: [string];
  armorProficiency: [string];
  weaponProficiency: [string];
  classSkills?: [string];
  skillPointsFirstLevel: number;
  skillPointsEachLevel: number;
  baseAttackBonus: number;
  saves: {
    fortitude: number,
    reflex: number,
    will: number,
  };

}
