import { Component, OnInit } from '@angular/core';
import { Feat, FeatId, SkillBenefit, CombatBenefit, SavingThrowBenefit } from '../../../models/feat/feat';
import { FeatService } from '../../../services/firebase/feat/feat.service';
import { SkillId } from '../../../models/character/skill';
import { SkillService } from '../../../services/firebase/skill/skill.service';
import { CharacterClassService } from '../../../services/firebase/character-class/character-class.service';
import { CharacterClassId } from '../../../models/character/character-class';

@Component({
  selector: 'app-add-feat',
  templateUrl: './add-feat.component.html',
  styleUrls: ['./add-feat.component.css']
})
export class AddFeatComponent implements OnInit {

  public feats: FeatId[];
  public skills: SkillId[];
  public characterClasses: CharacterClassId[];

  // Inputs for prerequisites
  public featInput: string;
  public skillNameInput: string;
  public skillRankInput: number;
  public charClassNameInput: string;
  public charClassLevelInput: number;
  public abilityScoreInput = { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 };
  public baseAttackInput: number;

  // Inputs for benefits
  public skillBenefit: SkillBenefit;
  public combatBenefit: CombatBenefit;
  public savingThrowBenefit: SavingThrowBenefit;

  public feat: Feat;

  constructor(private featService: FeatService,
              private skillService: SkillService,
              private characterClassService: CharacterClassService) {
    featService.getFeats().subscribe(featsData => {
      this.feats = featsData;
    });
    skillService.getSkills().subscribe(skillsData => {
      this.skills = skillsData;
    });
    characterClassService.getClasses().subscribe(charClasses => {
      this.characterClasses = charClasses;
    });
  }

  ngOnInit() {
    this.feat = {
      name: null,
      description: null,
      featType: ['General'],
      rulebook: 'Player\'s Handbook 3.5e',
      benefit: {
        skills: new Map<string, number>(),
        combat: {
          initiative: 0,
          attack: 0,
          damage: 0,
          armorClass: 0
        },
        savingThrow: {
          fortitude: 0,
          reflex: 0,
          will: 0
        }
      },
      special: null,
      normal: null,
      prerequisites: {
        abilityScore: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 }, // from character abilities
        classLevel: new Map<string, number>(),  // from char class
        baseAttackBonus: null,                  // from character combat stats
        skillRank: new Map<string, number>(),   // from char skills
        feats: []                               // from char feats
      }
    };

    this.abilityScoreInput = { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 };
    this.charClassNameInput = null;
    this.charClassLevelInput = 0;
    this.skillNameInput = null;
    this.skillRankInput = 0;
    this.featInput = null;
    this.baseAttackInput = 0;

    this.skillBenefit = {
      skillId: null,
      skillBonus: 3
    };
    this.combatBenefit = {
      initiative: 0,
      attack: 0,
      damage: 0,
      armorClass: 0
    };
    this.savingThrowBenefit = {
      fortitude: 0,
      reflex: 0,
      will: 0
    };

  }

  addPrerequisiteCharClass() {
    console.log('addPrerequisiteSkill: ', this.charClassNameInput, this.charClassLevelInput);
    if (this.charClassNameInput !== undefined && this.charClassNameInput !== null
      && this.charClassLevelInput !== undefined && this.charClassLevelInput !== null) {
      this.feat.prerequisites.classLevel.set(this.charClassNameInput, this.charClassLevelInput);
    }
  }

  clearPrerequisiteCharClass() {
    this.feat.prerequisites.classLevel = new Map<string, number>();
  }

  addPrerequisiteSkill() {
    console.log('addPrerequisiteSkill: ', this.skillNameInput, this.skillRankInput);
    if (this.skillNameInput !== undefined && this.skillNameInput !== null
      && this.skillRankInput !== undefined && this.skillRankInput !== null) {
      this.feat.prerequisites.skillRank.set(this.skillNameInput, this.skillRankInput);
    }
  }

  clearPrerequisiteSkill() {
    this.feat.prerequisites.skillRank = new Map<string, number>();
  }

  addPrerequisiteFeat() {
    console.log('addPrerequisiteFeat: ', this.featInput);
    if (this.featInput !== undefined && this.featInput !== null && !this.feat.prerequisites.feats.includes(this.featInput)) {
      this.feat.prerequisites.feats.push(this.featInput);
    }
  }

  clearPrerequisiteFeat() {
    this.feat.prerequisites.feats = [];
  }


  /*
  ADD SKILL BENEFITS BUTTON
   */
  addSkillBenefit() {
    // console.log(this.skillBenefit.skillId, this.skillBenefit.skillBonus);
    if (this.skillBenefit.skillId !== undefined && this.skillBenefit.skillId !== null) {
      this.feat.benefit.skills.set(this.skillBenefit.skillId, this.skillBenefit.skillBonus);
    }
  }

  clearSkillBenefit() {
    this.feat.benefit.skills = new Map<string, number>();
  }


  /*
  ADD FEAT BUTTON
   */
  addFeat() {
    if ( this.feat.name !== '' && this.feat.description !== '' ) {
      console.log('Adding feat: ', this.feat);

      this.feat.prerequisites.abilityScore = this.abilityScoreInput;
      this.feat.prerequisites.baseAttackBonus = this.baseAttackInput;

      this.feat.benefit.combat = this.combatBenefit;
      this.feat.benefit.savingThrow = this.savingThrowBenefit;

      // Convert feat.prerequisites maps
      this.feat.prerequisites.classLevel = this.convertMapToObj(this.feat.prerequisites.classLevel);
      this.feat.prerequisites.skillRank = this.convertMapToObj(this.feat.prerequisites.skillRank);
      // Convert benefit.skills map
      this.feat.benefit.skills = this.convertMapToObj(this.feat.benefit.skills);

      // Add the new feat
      this.featService.addFeat(this.feat);

      this.ngOnInit();
    }
  }

  convertMapToObj(strMap) {
    const obj = Object.create(null);
    strMap.forEach((k, v) => {
      obj[v] = k;
    });
    return obj;
  }

}
