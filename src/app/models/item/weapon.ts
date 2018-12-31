import { Item } from './item';
import { Size } from '../../enums/enum-size';

export interface Weapon extends Item {

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
