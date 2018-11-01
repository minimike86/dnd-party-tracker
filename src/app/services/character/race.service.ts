import { Injectable } from '@angular/core';
import { Race } from '../../models/character/race';
import { RaceName } from '../../enums/enum-race';
import { AbilityScore } from '../../models/character/ability-scores';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  getRaceList(): Array<Race> {
    return [
      // DEFAULT
      new Race(RaceName.NULL, new AbilityScore(0, 0, 0, 0, 0, 0), 'Any'),
      // Standard Races PHB
      new Race(RaceName.HUMAN, new AbilityScore(0, 0, 0, 0, 0, 0), 'Any'),
      new Race(RaceName.DWARF, new AbilityScore(0, 0, 2, 0, 0, -2), 'Fighter'),
      new Race(RaceName.ELF, new AbilityScore(0, 2, -2, 0, 0, 0), 'Wizard'),
      new Race(RaceName.GNOME, new AbilityScore(-2, 0, 2, 0, 0, 0), 'Bard'),
      new Race(RaceName.HALF_ELF, new AbilityScore(0, 0, 0, 0, 0, 0), 'Any'),
      new Race(RaceName.HALF_ORC, new AbilityScore(2, 0, 0, -2, 0, -2), 'Barbarian'),
      new Race(RaceName.HALFLING, new AbilityScore(-2, 2, 0, 0, 0, 0), 'Rogue'),
      // EXTRA
      new Race(RaceName.AASIMAR, new AbilityScore(0, 0, 0, 0, 2, 2), 'Paladin'),
      new Race(RaceName.GOBLIN, new AbilityScore(-2, 2, -2, 0, 0, 0), 'Rogue'),
      new Race(RaceName.KOBOLD, new AbilityScore(-4, 2, -2, 0, 0, 0), 'Sorcerer'),
      new Race(RaceName.ORC, new AbilityScore(4, 0, 0, -2, -2, -2), 'Barbarian'),
      new Race(RaceName.TIEFLING, new AbilityScore(0, 2, 0, 2, 0, -2), 'Rogue'),
      new Race(RaceName.TIBBIT, new AbilityScore(-2, 2, 0, 0, 0, 0), 'Rogue'),
      new Race(RaceName.WARFORGED, new AbilityScore(0, 0, 2, 0, -2, -2), 'Fighter')
    ];
  }

}
