export interface Party {

  name: string;
  description: string;
  campaign: string;
  members: string[];
  partyLeader: string;

}

export interface PartyId extends Party {

  id: string;

}
