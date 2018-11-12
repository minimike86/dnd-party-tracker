export interface Party {

  name: string;
  description: string;
  campaign: string;
  members: string[];
  partyLeader: string;
  dateCreated: Date;

}

export interface PartyId extends Party {

  id: string;

}
