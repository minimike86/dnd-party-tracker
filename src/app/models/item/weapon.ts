import { Cost, Item, ItemType } from './item';
import { Size } from '../../enums/enum-size';

export class Weapon extends Item {
  category: WeaponCategory;
  combatStyle: CombatStyle;
  weaponType?: WeaponType;
  weaponBonus?: number;
  size: Size;
  reach: boolean;
  double: boolean;
  thrown: boolean;
  projectile: boolean;
  ammunition?: Array<AmmunitionType>;
  damage: string;
  damageType: Array<DamageType>;
  critical: string;
  rangeIncrement?: number;
  special?: string;
  masterwork: boolean;

  constructor(id: number, name: string, description: string, cost: Cost, weight: number, category: WeaponCategory,
              combatStyle: CombatStyle, weaponType: WeaponType, weaponBonus: number, size: Size, reach: boolean, double: boolean,
              thrown: boolean, projectile: boolean, ammunition: Array<AmmunitionType>, damage: string, damageType: Array<DamageType>,
              critical: string, rangeIncrement: number, special: string, masterwork: boolean) {

    super(id, name, description, ItemType.WEAPON, cost, weight);
    this.category = category;
    this.combatStyle = combatStyle;
    this.weaponType = weaponType;
    this.weaponBonus = weaponBonus;
    this.size = size;
    this.reach = reach;
    this.double = double;
    this.thrown = thrown;
    this.projectile = projectile;
    this.ammunition = ammunition;
    this.damage = damage;
    this.damageType = damageType;
    this.critical = critical;
    this.rangeIncrement = rangeIncrement;
    this.special = special;
    this.masterwork = masterwork;

  }

}


export interface AmmunitionType {
  ammoType: string;
  quantity: number;
}


export enum WeaponCategory {
  SIMPLE = 'Simple',
  MARTIAL = 'Martial',
  EXOTIC = 'Exotic'
}


export enum CombatStyle {
  MELEE = 'Melee',
  RANGED = 'Ranged'
}


export enum WeaponType {
  LIGHT = 'Light',
  ONE_HANDED = 'One Handed',
  TWO_HANDED = 'Two Handed'
}


export enum DamageType {
  BLUDGEONING = 'B',
  PIERCING = 'P',
  SLASHING = 'S'
}
