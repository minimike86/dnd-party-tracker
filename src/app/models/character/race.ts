export interface RaceId extends Race {

  id: string;

}

export interface Race {

  name: string;
  abilityScoreAdjustments?: Map<string, number>;
  favoredClass?: string;

}
