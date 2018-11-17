export interface ReligionId extends Religion {

  id: string;

}

export interface Religion {

  name: string;
  deityOf: [string]; // Portfolio
  titles?: [string];
  image?: string;
  domains: [string];
  alignment: string;
  clericAlignments: [string];
  holySymbol?: string;
  holyNumber?: number;
  favoredWeapon: string;
  worshipedBy: {
    classes?:  [string],
    races?: [string]
  };

}
