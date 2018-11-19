import { Component, OnInit } from '@angular/core';
import { RaceService } from '../../../services/firebase/race/race.service';
import { Race } from '../../../models/character/race';

@Component({
  selector: 'app-add-race',
  templateUrl: './add-race.component.html',
  styleUrls: ['./add-race.component.css']
})
export class AddRaceComponent implements OnInit {

  public race = {
    name: null,
    abilityScoreAdjustments: {
      strength: null,
      dexterity: null,
      constitution: null,
      intelligence: null,
      wisdom: null,
      charisma: null
    },
    icon: null,
    size: 'Medium',
    automaticLanguages: null,
    bonusLanguages: null,
    baseLandSpeed: null,
    movementModes: {
      burrow: null,
      climb: null,
      fly: {
        speed: null,
        maneuverability: null
      },
      swim: null
    },
    vision: {
      lowLight: null,
      dark: null
    },
    startingAges: {
      adulthood: null,
      classAges: {
        simple: {
          dieCount: null,
          dieType: null
        },
        moderate: {
          dieCount: null,
          dieType: null
        },
        complex: {
          dieCount: null,
          dieType: null
        }
      }
    },
    agingEffects: {
      middleAge: null,
      old: null,
      venerable: null,
      maximum: {
        dieCount: null,
        dieType: null
      }
    },
    baseHeight: {
      male: {
        feet: null,
        inches: null
      },
      female: {
        feet: null,
        inches: null
      }
    },
    heightModifier: {
      male: {
        dieCount: null,
        dieType: null
      },
      female: {
        dieCount: null,
        dieType: null
      }
    },
    baseWeight: {
      male: null,
      female: null
    },
    weightModifier: {
      male: {
        dieCount: null,
        dieType: null
      },
      female: {
        dieCount: null,
        dieType: null
      }
    },
    favoredClass: null,
  };

  constructor(public raceService: RaceService) {
  }

  ngOnInit() {
  }

  addRace() {
    // this.raceService.addRace(this.race);
  }

}
