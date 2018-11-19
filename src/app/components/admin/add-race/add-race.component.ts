import { Component, OnInit } from '@angular/core';
import { RaceService } from '../../../services/firebase/race/race.service';

@Component({
  selector: 'app-add-race',
  templateUrl: './add-race.component.html',
  styleUrls: ['./add-race.component.css']
})
export class AddRaceComponent implements OnInit {

  public automaticLanguages = [];
  public bonusLanguages = [];
  public special = [];
  public savingThrowBonuses = {bonus: null, vs: null};
  public attackRollBonuses = {bonus: null, vs: null};
  public armorBonuses = {bonus: null, type: null, vs: null};
  public skillRollBonuses = {bonus: null, vs: null};

  public race = {
    name: null,
    type: 'Humanoid',
    subType: 'Human',
    abilityScoreAdjustments: {
      strength: null,
      dexterity: null,
      constitution: null,
      intelligence: null,
      wisdom: null,
      charisma: null
    },
    special: null,
    extraFeatFirstLevel: null,
    extraSkillPointsFirstLevel: null,
    extraSkillPointsEachLevel: null,
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
    savingThrowBonuses: null,
    attackRollBonuses: null,
    armorBonuses: null,
    skillRollBonuses: null,
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
    levelAdjustment: null
  };

  constructor(public raceService: RaceService) {
  }

  ngOnInit() {
  }

  addAutomaticLanguage() {
    //
  }

  clearAutomaticLanguages() {
    //
  }

  addBonusLanguage() {
    //
  }

  clearBonusLanguages() {
    //
  }

  addSavingThrowBonuses() {
    //
  }

  clearSavingThrowBonuses() {
    //
  }

  addAttackRollBonuses() {
    //
  }

  clearAttackRollBonuses() {
    //
  }

  addArmorBonuses() {
    //
  }

  clearArmorBonuses() {
    //
  }

  addSkillRollBonuses() {
    //
  }

  clearSkillRollBonuses() {
    //
  }

  addSpecial() {
    //
  }

  clearSpecial() {
    //
  }

  addRace() {
    this.raceService.addRace(this.race);
  }

}
