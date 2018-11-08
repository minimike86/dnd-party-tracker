export interface Party {

  name: string;
  description: string;
  members: string[];

}

export interface PartyId extends Party {

  id: string;

}
