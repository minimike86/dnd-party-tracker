export interface CharacterClassId extends CharacterClass {

  id: string;

}

export interface CharacterClass {

  name: string;
  icon: string;
  hitDie: number;
  startingAgeType: string;
  abilities: string[];
  alignmentWhitelist: string[];
  armorProficiency: string[];
  weaponProficiency: string[];
  classSkills: string[];
  skillPointsPerLevel: number;
  baseAttackBonus: number;
  saves: {
    fortitude: number,
    reflex: number,
    will: number,
  };

}
