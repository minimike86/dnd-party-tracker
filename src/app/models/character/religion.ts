export interface ReligionId extends Religion {

  id: string;

}

export interface Religion {

  name: string;
  deityOf: [string];
  titles?: [string];
  image?: [string];
  domains: [string];
  alignment: string;
  favoredWeapon: string;
  worshipedBy: {
    classes?:  [string],
    races?: [string]
  };

}
