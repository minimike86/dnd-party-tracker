import {AbilityScore} from '../character/ability-scores';

export interface FeatId extends Feat {

  id: string;

}

export interface Feat {
  name: string;
  description: string;
  featType: string[];
  rulebook?: string;
  benefit: {
    combat?: {
      initiative?: number;
      attack?: number;
      damage?: number;
      armorClass?: number;
    }
    skills?: Map<string, number>;
    savingThrow?: {
      fortitude?: number,
      reflex?: number,
      will?: number
    }
  };                         // What the feat enables the character ("you" in the feat description) to do. If a character has the same feat
                              // more than once, its benefits do not stack unless indicated otherwise in the description.In general, having
                              // a feat twice is the same as having it once.
  special?: string;          // Additional facts about the feat that may be helpful when you decide whether to acquire the feat.
  normal?: string;           // What a character who does not have this feat is limited to or restricted from doing.
                              // If not having the feat causes no particular drawback, this entry is absent.
  prerequisites?: {
    abilityScore?: AbilityScore;
    classLevel?: Array<{classId: string, level: number}>;
    classCheckLogic?: string,
    baseAttackBonus?: number;
    skillRank?: Array<{skillId: string, ranks: number}>;
    feats?: string[];
  };  // What the feat enables the character ("you" in the feat description) to do. If a character has the same feat
                              // more than once, its benefits do not stack unless indicated otherwise in the description.
                              // In general, having a feat twice is the same as having it once.
}

export interface SkillBenefit {
  skillId: string;
  skillBonus: number;
}

export interface CombatBenefit {
  initiative: number;
  attack: number;
  damage: number;
  armorClass: number;
}

export interface SavingThrowBenefit {
  fortitude: number;
  reflex: number;
  will: number;
}

export enum FeatType {
  GENERAL = 'general',
  ITEM_CREATION = 'item creation',
  METAMAGIC = 'metamagic'
}

export enum FeatCategory {
  ABERRANT = 'aberrant',
  ABYSSAL_HERITOR = 'abyssal heritor',
  AMBUSH = 'ambush',
  ANCESTOR = 'ancestor',
  BACKGROUND = 'background',
  BARDIC = 'bardic',
  BLOODGIFT = 'bloodgift',
  BLOODLINE = 'bloodline',
  BREATH = 'breath',
  CEREMONY = 'ceremony',
  COMBAT_FORM = 'combat form',
  CORRUPTER = 'corrupter',
  CREATURE = 'creature',
  DEFORMITY = 'deformity',
  DEVIL_TOUCHED = 'devil-touched',
  DIVINE = 'divine',
  DOMAIN = 'domain',
  DOMINATOR = 'dominator',
  DRACONIC = 'draconic',
  DREAMTOUCHED = 'dreamtouched',
  EPIC = 'epic',
  EXALTED = 'exalted',
  FAITH = 'faith',
  FIGHTER_BONUS_FEAT = 'fighter bonus feat',
  FLAW = 'flaw',
  GENERAL = 'general',
  GHOST = 'ghost',
  HAUNT = 'haunt',
  HERITAGE = 'heritage',
  HOST = 'host',
  INCARNUM = 'incarnum',
  INITIATE = 'initiate',
  INTERACTION = 'interaction',
  ITEM_CREATION = 'item creation',
  LEADER = 'leader',
  LEGACY = 'legacy',
  LUCK = 'luck',
  MANIPULATION = 'manipulation',
  MENTAL = 'mental',
  METABREATH = 'metabreath',
  METAMAGIC = 'metamagic',
  METAPSIONIC = 'metapsionic',
  METASHADOW = 'metashadow',
  MONSTER = 'monster',
  MONSTROUS = 'monstrous',
  MOVEMENT = 'movement',
  NODE_MAGIC = 'node magic',
  POLTERGEIST = 'poltergeist',
  PSIONIC = 'psionic',
  RACIAL = 'racial',
  REGIONAL = 'regional',
  RESERVE = 'reserve',
  RITUAL_PSEUDOFEAT = 'ritual (pseudofeat)',
  SHAPER = 'shaper',
  SHIFTER = 'shifter',
  SHIFTER_TRAIT = 'shifter trait',
  SKILL_TRICK = 'skill trick',
  SPECIAL = 'special',
  SPELLTOUCHED = 'spelltouched',
  STYLE = 'style',
  TACTICAL = 'tactical',
  TAINTED = 'tainted',
  TRAIT = 'trait',
  TRAVELER = 'traveler',
  VILE = 'vile',
  WARFORGED = 'warforged',
  WILD = 'wild'
}
