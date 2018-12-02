import { Component, Inject, OnInit } from '@angular/core';
import { CharacterClass } from '../../../models/character/character-class';
import { CharacterClassService } from '../../../services/firebase/character-class/character-class.service';
import { getAlignmentAcronym, Alignment } from '../../../enums/enum-alignment';
import { WINDOW } from '../../../window-provider';
import { SkillService } from '../../../services/firebase/skill/skill.service';
import { SkillId } from '../../../models/character/skill';


@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  public skills: SkillId[];

  public cls: CharacterClass;
  public abilities: string[];
  public alignmentWhitelist: string[];
  public armorProficiency: string[];
  public weaponProficiency: string[];
  public classSkills: string[];

  public alignmentWhitelistValues: string[];

  public baseSaveBonusGood: number[];
  public baseSaveBonusPoor: number[];
  public baseAttackBonusGood: number[];
  public baseAttackBonusAverage: number[];
  public baseAttackBonusPoor: number[];

  public canAddCharClass: boolean;

  public hostname: string;

  constructor(@Inject(WINDOW) private window: Window,
              private skillsService: SkillService,
              private classService: CharacterClassService) {
    this.hostname = this.window.location.host;
    skillsService.getSkills().subscribe(data => {
      this.skills = data;
    });
  }

  ngOnInit() {

    this.canAddCharClass = false;

    this.cls = {
      name: null,
      icon: null,
      hitDie: null,
      startingAgeType: null,
      abilities: [],
      alignmentWhitelist: [],
      armorProficiency: [],
      weaponProficiency: [],
      baseAttackBonus: null,
      saves: {
        fortitude: null,
        reflex: null,
        will: null
      },
      classSkills: [],
      skillPointsPerLevel: null
    };

    this.abilities = [];
    this.alignmentWhitelist = [];
    this.alignmentWhitelistValues = [ Alignment.LG, Alignment.NG, Alignment.CG,
                                      Alignment.LN, Alignment.N, Alignment.CN,
                                      Alignment.LE, Alignment.NE, Alignment.CE ];
    this.armorProficiency = [];
    this.weaponProficiency = [];
    this.classSkills = [];

    this.baseSaveBonusGood      = [2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12];
    this.baseSaveBonusPoor      = [0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5,  5,  5,  6,  6,  6];

    this.baseAttackBonusGood    = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    this.baseAttackBonusAverage = [0, 1, 2, 3, 3, 4, 5, 6, 6,  7,  8,  9,  9, 10, 11, 12, 12, 13, 14, 15];
    this.baseAttackBonusPoor    = [0, 1, 1, 2, 2, 3, 3, 4, 4,  5,  5,  6,  6,  7,  7,  8,  8,  9,  9, 10];

  }

  checkCanAddCharClass(): void {
    if (   this.cls !== undefined
        && this.cls.name !== null
        && this.cls.icon !== null
        && this.cls.hitDie !== null
        && this.cls.startingAgeType !== null
        && this.cls.abilities.length > 0
        && this.cls.alignmentWhitelist.length > 0
        && this.cls.armorProficiency.length >= 0
        && this.cls.weaponProficiency.length > 0
        && this.cls.baseAttackBonus !== null
        && this.cls.saves.fortitude !== null
        && this.cls.saves.reflex !== null
        && this.cls.saves.will !== null
        && this.cls.classSkills.length > 0
        && this.cls.skillPointsPerLevel !== null ) {
      this.canAddCharClass = true;
    } else {
      this.canAddCharClass = false;
    }
  }

  addCharacterClass(): void {
    this.checkCanAddCharClass();
    if (this.canAddCharClass) {
      this.classService.addCharacterClass(this.cls);
      this.ngOnInit();
    }
  }

  getAlignmentWhitelistAcronym(alignmentFullText: string): string {
    return getAlignmentAcronym(alignmentFullText);
  }

  abilitiesChanged(): void {
    this.cls.abilities = this.abilities;
    this.checkCanAddCharClass();
  }

  alignmentWhitelistChanged(): void {
    this.cls.alignmentWhitelist = this.alignmentWhitelist;
    this.checkCanAddCharClass();
  }

  armorProficiencyChanged(): void {
    this.cls.armorProficiency = this.armorProficiency;
    this.checkCanAddCharClass();
  }

  weaponProficiencyChanged(): void {
    this.cls.weaponProficiency = this.weaponProficiency;
    this.checkCanAddCharClass();
  }

  classSkillsChanged(): void {
    this.cls.classSkills = this.classSkills;
    this.checkCanAddCharClass();
  }

}
