import {AbilityScore} from './ability-scores';
import {CharacterClass} from './character-class';

export interface RaceId extends Race {

  id: string;

}

export interface Race {

  name: string;
  variety?: string;
  type: string;
  subType: string;
  abilityScoreAdjustments?: {
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number
  };
  extraFeatFirstLevel?: number;
  extraSkillPointsFirstLevel?: number;
  extraSkillPointsEachLevel?: number;
  icon: string;
  size: string;
  automaticLanguages?: Array<string>;
  bonusLanguages?: Array<string>;
  baseLandSpeed: number;
  savingThrowBonuses?: Array<{bonus: number, type: string, vs?: string}>;
  attackRollBonuses?: Array<{bonus: number, type: string, vs?: string}>;
  armorBonuses?: Array<{bonus: number, type: string, vs?: string}>;
  skillRollBonuses?: Array<{bonus: number, type: string, vs?: string}>;
  movementModes?: {
    burrow: number,
    climb: number,
    fly: {
      speed: number,
      maneuverability: string
    },
    swim: number
  };
  vision: {
    lowLight: number,
    dark: number
  };
  startingAges: {
    adulthood: number,
    classAges: {
      simple: {
        dieCount: number,
        dieType: number
      },
      moderate: {
        dieCount: number,
        dieType: number
      },
      complex: {
        dieCount: number,
        dieType: number
      }
    }
  };
  agingEffects: {
    middleAge: number,
    old: number,
    venerable: number,
    maximum: {
      dieCount: number,
      dieType: number
    }
  };
  baseHeight: {
    male: {
      feet: number,
      inches: number
    },
    female: {
      feet: number,
      inches: number
    }
  };
  heightModifier: {
    male: {
      dieCount: number,
      dieType: number
    },
    female: {
      dieCount: number,
      dieType: number
    }
  };
  baseWeight: {
    male: number,
    female: number
  };
  weightModifier: {
    male: {
      dieCount: number,
      dieType: number
    },
    female: {
      dieCount: number,
      dieType: number
    }
  };
  favoredClass: string;
  special?: Array<string>;
  levelAdjustment?: number;

}

export function generateRandomHeight(race: Race, gender: string): { feet: number, inches: number } {
  let baseHeight = { feet: 0, inches: 0 };
  let baseHeightModifier = 0;
  switch (gender) {
    case 'male':
      baseHeight = { feet: race.baseHeight.male.feet, inches: race.baseHeight.male.inches };
      for (let i = 1; i < race.heightModifier.male.dieCount; i++) {
        baseHeightModifier += Math.floor(Math.random() * race.heightModifier.male.dieType) + 1;
      }
      break;
    case 'female':
      baseHeight = { feet: race.baseHeight.female.feet, inches: race.baseHeight.female.inches };
      for (let i = 1; i < race.heightModifier.female.dieCount; i++) {
        baseHeightModifier += Math.floor(Math.random() * race.heightModifier.female.dieType) + 1;
      }
      break;
  }
  console.log('baseHeight: ', baseHeight);
  console.log('baseHeightModifier: ', baseHeightModifier);
  return baseHeight;
}

export function generateRandomWeight(race: Race, gender: string): number {
  let baseWeight = 0;
  let baseWeightMultiplier = 0;
  switch (gender) {
    case 'male':
      for (let i = 1; i < race.weightModifier.male.dieCount; i++) {
        baseWeightMultiplier += Math.floor(Math.random() * race.weightModifier.male.dieType) + 1;
      }
      baseWeight = race.baseWeight.male * baseWeightMultiplier;
      break;
    case 'female':
      for (let i = 1; i < race.weightModifier.female.dieCount; i++) {
        baseWeightMultiplier += Math.floor(Math.random() * race.weightModifier.female.dieType) + 1;
      }
      baseWeight = race.baseWeight.female * baseWeightMultiplier;
      break;
  }
  return baseWeight;
}

export function generateStartingAge(race: Race, charClass: CharacterClass): number {
  if (race !== undefined && charClass !== undefined) {
    let age = race.startingAges.adulthood;
    console.log('adulthood: ', age);
    switch (charClass.startingAgeType) {
      case 'simple':
        for (let i = 1; i <= race.startingAges.classAges.simple.dieCount; i++) {
          age += Math.floor(Math.random() * race.startingAges.classAges.simple.dieType) + 1;
          console.log('age(' + i + '): ', age);
        }
        console.log('charClass: ', charClass.name, ', startingAgeType: ', charClass.startingAgeType);
        console.log('dieCount: ', race.startingAges.classAges.simple.dieCount);
        console.log('dieType: ', race.startingAges.classAges.simple.dieType);
        break;
      case 'moderate':
        for (let i = 1; i <= race.startingAges.classAges.moderate.dieCount; i++) {
          age += Math.floor(Math.random() * race.startingAges.classAges.moderate.dieType) + 1;
          console.log('age(' + i + '): ', age);
        }
        console.log('charClass: ', charClass.name, ', startingAgeType: ', charClass.startingAgeType);
        console.log('dieCount: ', race.startingAges.classAges.moderate.dieCount);
        console.log('dieType: ', race.startingAges.classAges.moderate.dieType);
        break;
      case 'complex':
        for (let i = 1; i <= race.startingAges.classAges.complex.dieCount; i++) {
          age += Math.floor(Math.random() * race.startingAges.classAges.complex.dieType) + 1;
          console.log('age(' + i + '): ', age);
        }
        console.log('charClass: ', charClass.name, ', startingAgeType: ', charClass.startingAgeType);
        console.log('dieCount: ', race.startingAges.classAges.complex.dieCount);
        console.log('dieType: ', race.startingAges.classAges.complex.dieType);
        break;
    }
    return age;
  } else {
    console.log('generateStartingAge() ERROR: ', 'race: ', race , 'charClass: ', charClass);
  }
}

export function getAgeCategory(race: Race, age: number): string {
  if (age >= race.agingEffects.venerable) {
    return 'venerable';
  } else if (age >= race.agingEffects.old) {
    return 'old';
  } else if (age >= race.agingEffects.middleAge) {
    return 'middleAge';
  }
  return 'adulthood';
}

export function getAgingEffects(race: Race, age: number): AbilityScore {
  if (age >= race.agingEffects.venerable) {
    return new AbilityScore(-6, -6, -6, 3, 3, 3);
  } else if (age >= race.agingEffects.old) {
    return new AbilityScore(-3, -3, -3, 2, 2, 2);
  } else if (age >= race.agingEffects.middleAge) {
    return new AbilityScore(-1, -1, -1, 1, 1, 1);
  }
  return new AbilityScore(0, 0, 0, 0, 0, 0);
}
