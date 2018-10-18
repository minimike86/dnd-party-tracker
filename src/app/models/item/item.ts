export class Item {
  id: number;
  name: string;
  description: string;
  itemType: ItemType;
  cost: Cost;
  weight: number;

  constructor(id: number, name: string, description: string, itemType: ItemType, cost: Cost, weight: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.itemType = itemType;
    this.cost = cost;
    this.weight = weight;
  }

}


export interface Cost {
  platinum: number;
  gold: number;
  electrum: number;
  silver: number;
  copper: number;
}


export enum ItemType {
  COIN,
  TREASURE,
  ART_OBJECT,
  ADVENTURING_GEAR,
  TOOL,
  SKILL_KIT,
  CLOTHING,
  FOOD_DRINK,
  TRANSPORT,
  ARMOR,
  WEAPON,
  POTION,
  RING,
  ROD,
  SCROLL,
  STAFF,
  WAND,
  WONDEROUS_ITEM,
  INTELLIGENT_ITEM,
  CURSED_ITEM,
  ARTIFACT
}
