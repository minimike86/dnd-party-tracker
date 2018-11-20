import { Component, OnInit } from '@angular/core';
import { RaceService } from '../../../services/firebase/race/race.service';
import {Race} from '../../../models/character/race';

@Component({
  selector: 'app-add-race',
  templateUrl: './add-race.component.html',
  styleUrls: ['./add-race.component.css']
})
export class AddRaceComponent implements OnInit {

  public race: Race;

  public automaticLanguages = [];
  public bonusLanguages = [];
  public savingThrowBonuses = [];
  public attackRollBonuses = [];
  public armorBonuses = [];
  public skillRollBonuses = [];
  public special = [];

  public automaticLanguagesTemp = '';
  public bonusLanguagesTemp = '';
  public savingThrowBonusesTemp = {bonus: '', type: null, vs: ''};
  public attackRollBonusesTemp = {bonus: '', type: null, vs: ''};
  public armorBonusesTemp = {bonus: '', type: null, vs: ''};
  public skillRollBonusesTemp = {bonus: '', skill: null, relatedTo: ''};
  public specialTemp = '';

  constructor(public raceService: RaceService) {
  }

  ngOnInit() {

    this.race = {
      name: null,
      variety: null,
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

    this.automaticLanguages = [];
    this.bonusLanguages = [];
    this.savingThrowBonuses = [];
    this.attackRollBonuses = [];
    this.armorBonuses = [];
    this.skillRollBonuses = [];
    this.special = [];

  }

  addAutomaticLanguage() {
    if (this.automaticLanguagesTemp !== ''
        && !this.automaticLanguages.includes(this.automaticLanguagesTemp)) {
      this.automaticLanguages.push(this.automaticLanguagesTemp);
      this.automaticLanguagesTemp = '';
    }
  }

  clearAutomaticLanguages() {
    this.automaticLanguages = [];
  }

  addBonusLanguage() {
    if (this.bonusLanguagesTemp !== ''
        && !this.bonusLanguages.includes(this.bonusLanguagesTemp)) {
      this.bonusLanguages.push(this.bonusLanguagesTemp);
      this.bonusLanguagesTemp = '';
    }
  }

  clearBonusLanguages() {
    this.bonusLanguages = [];
  }

  addSavingThrowBonuses() {
    if (this.savingThrowBonusesTemp.bonus !== '' && this.savingThrowBonusesTemp.type !== '' && this.savingThrowBonusesTemp.vs !== ''
        && ( this.savingThrowBonuses.filter(data => data.type === this.savingThrowBonusesTemp.type).length === 0
        || this.savingThrowBonuses.filter(data => data.vs === this.savingThrowBonusesTemp.vs).length === 0 )) {
      this.savingThrowBonuses.push({
        bonus: this.savingThrowBonusesTemp.bonus,
        type: this.savingThrowBonusesTemp.type,
        vs: this.savingThrowBonusesTemp.vs
      });
      this.savingThrowBonusesTemp = {bonus: '', type: null, vs: ''};
    }
  }

  clearSavingThrowBonuses() {
    this.savingThrowBonuses = [];
  }

  addAttackRollBonuses() {
    if (this.attackRollBonusesTemp.bonus !== '' && this.attackRollBonusesTemp.type !== '' && this.attackRollBonusesTemp.vs !== ''
        && ( this.attackRollBonuses.filter(data => data.type === this.attackRollBonusesTemp.type).length === 0
        || this.attackRollBonuses.filter(data => data.vs === this.attackRollBonusesTemp.vs).length === 0 )) {
      this.attackRollBonuses.push({
        bonus: this.attackRollBonusesTemp.bonus,
        type: this.attackRollBonusesTemp.type,
        vs: this.attackRollBonusesTemp.vs
      });
      this.attackRollBonusesTemp = {bonus: '', type: null, vs: ''};
    }
  }

  clearAttackRollBonuses() {
    this.attackRollBonuses = [];
  }

  addArmorBonuses() {
    if (this.armorBonusesTemp.bonus !== '' && this.armorBonusesTemp.type !== '' && this.armorBonusesTemp.vs !== ''
        && ( this.armorBonuses.filter(data => data.type === this.armorBonusesTemp.type).length === 0
        || this.armorBonuses.filter(data => data.vs === this.armorBonusesTemp.vs).length === 0 )) {
      this.armorBonuses.push({
        bonus: this.armorBonusesTemp.bonus,
        type: this.armorBonusesTemp.type,
        vs: this.armorBonusesTemp.vs
      });
      this.armorBonusesTemp = {bonus: '', type: null, vs: ''};
    }
  }

  clearArmorBonuses() {
    this.armorBonuses = [];
  }

  addSkillRollBonuses() {
    if (this.skillRollBonusesTemp.bonus !== '' && this.skillRollBonusesTemp.skill !== '' && this.skillRollBonusesTemp.relatedTo !== ''
        && ( this.skillRollBonuses.filter(data => data.type === this.skillRollBonusesTemp.skill).length === 0
        || this.skillRollBonuses.filter(data => data.vs === this.skillRollBonusesTemp.relatedTo).length === 0 )) {
      this.skillRollBonuses.push({
        bonus: this.skillRollBonusesTemp.bonus,
        type: this.skillRollBonusesTemp.skill,
        vs: this.skillRollBonusesTemp.relatedTo
      });
      this.skillRollBonusesTemp = {bonus: '', skill: null, relatedTo: ''};
    }
  }

  clearSkillRollBonuses() {
    this.skillRollBonuses = [];
  }

  addSpecial() {
    if (this.specialTemp !== ''
        && !this.special.includes(this.specialTemp)) {
      this.special.push(this.specialTemp);
      this.specialTemp = '';
    }
  }

  clearSpecial() {
    this.special = [];
  }

  addRace() {
    this.race.automaticLanguages = this.automaticLanguages;
    this.race.bonusLanguages = this.bonusLanguages;
    this.race.savingThrowBonuses = this.savingThrowBonuses;
    this.race.attackRollBonuses = this.attackRollBonuses;
    this.race.armorBonuses = this.armorBonuses;
    this.race.skillRollBonuses = this.skillRollBonuses;
    this.race.special = this.special;
    this.raceService.addRace(this.race);
    this.ngOnInit();
  }

}
