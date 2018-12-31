import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '../../../services/firebase/character/character.service';
import { FeatService } from '../../../services/firebase/feat/feat.service';
import { FeatId} from '../../../models/feat/feat';
import { isEmptyObject } from '@angular/fire/database-deprecated/utils';
import { Character } from '../../../models/character/character';
import { CharacterClassService } from '../../../services/firebase/character-class/character-class.service';
import { CharacterClassId } from '../../../models/character/character-class';
import { AbilityScore } from '../../../models/character/ability-scores';

@Component({
  selector: 'app-new-character-feat',
  templateUrl: './new-character-feat.component.html',
  styleUrls: ['./new-character-feat.component.css']
})
export class NewCharacterFeatComponent implements OnInit {

  public tempCharacter: Character;
  public tempCharacterFeatSnapshot: string[];

  public characterClasses: CharacterClassId[];

  public feats: FeatId[];
  public fighterBonusFeats: FeatId[];

  public skillFeats: FeatId[];
  public skillFocusFeats: FeatId[];
  public spellFocusFeats: FeatId[];
  public savingThrowFeats: FeatId[];
  public mountedCombatFeats: FeatId[];
  public metamagicFeats: FeatId[];
  public itemCreationFeats: FeatId[];
  public otherFeats: FeatId[];

  public firstLevelFeat: FeatId;
  public humanBonusFeat: FeatId;
  public fighterBonusFeat: FeatId;

  public featsToAdd: { firstLevelFeat: boolean, humanBonusFeat: boolean, fighterBonusFeat: boolean, count: number };

  constructor(private router: Router,
              private featService: FeatService,
              public characterService: CharacterService,
              public characterClassService: CharacterClassService) {

    this.characterClassService.getClasses().subscribe(data => {
      this.characterClasses = data;
    });

    this.characterService.tempCharacter$.subscribe(data => {
      this.tempCharacter = data;
      if (this.tempCharacter.owner === null) {
        console.log('tempCharacter owner is null, returning to character creation step 1.');
        // router.navigate( ['/character/new/'] );
      } else {
        this.tempCharacterFeatSnapshot = this.tempCharacter.feats;
        if ( this.tempCharacter.raceId.includes('HUMAN') ) {
          this.featsToAdd.humanBonusFeat = true;
          this.featsToAdd.count += 1;
        }
        if ( this.hasRequiredClass(this.tempCharacter.classes, 'FIGHTER') ) {
          this.featsToAdd.fighterBonusFeat = true;
          this.featsToAdd.count += 1;
        }
      }
    });

    this.featService.getFeats().subscribe(featData => {
      this.feats = featData.sort(this.compareFeatNames);
      this.getFighterBonusFeatArray(this.feats);
      this.getSkillFeatArray(this.feats);
      this.getSkillFocusFeatArray(this.feats);
      this.getSpellFocusFeatArray(this.feats);
      this.getSavingThrowFeats(this.feats);
      this.getMountedCombatFeatsArray(this.feats);
      this.getMetamagicFeatsArray(this.feats);
      this.getItemCreationFeatsArray(this.feats);
      this.getOtherFeatArray(this.feats);
    });

  }

  ngOnInit() {
    this.skillFeats = [];
    this.skillFocusFeats = [];
    this.spellFocusFeats = [];
    this.mountedCombatFeats = [];
    this.metamagicFeats = [];
    this.itemCreationFeats = [];
    this.savingThrowFeats = [];
    this.otherFeats = [];
    this.fighterBonusFeats = [];

    this.firstLevelFeat = null;
    this.humanBonusFeat = null;
    this.fighterBonusFeat = null;

    this.featsToAdd = { firstLevelFeat: true, humanBonusFeat: false, fighterBonusFeat: false, count: 1 };
  }

  onFirstLevelFeatChange(featId: string): void {
    this.setSelectedFeats(featId);
  }

  onHumanBonusFeatChange(featId: string): void {
    this.setSelectedFeats(featId);
  }

  onFighterBonusFeatChange(featId: string): void {
    this.setSelectedFeats(featId);
  }

  setSelectedFeats(featId: string): void {
    if (this.tempCharacter !== undefined) {
      this.tempCharacter.feats = [].concat(this.tempCharacterFeatSnapshot);
      if (this.firstLevelFeat !== null) {
        this.tempCharacter.feats.push(this.firstLevelFeat.toString());
      }
      if (this.humanBonusFeat !== null) {
        this.tempCharacter.feats.push(this.humanBonusFeat.toString());
      }
      if (this.fighterBonusFeat !== null) {
        this.tempCharacter.feats.push(this.fighterBonusFeat.toString());
      }
    }
  }

  getPrerequisiteFeats(prerequisiteFeats: string): string {
    let tempString = '';
    for (const prereq of prerequisiteFeats) {
      if ( !this.tempCharacter.feats.includes(prereq) ) {
        tempString === '' ? tempString = this.feats.find(data => data.id === prereq).name
                          : tempString = tempString + ', ' + this.feats.find(data => data.id === prereq).name;
      }
    }
    return tempString;
  }

  meetsPrerequisiteClassLevel(characterClassId: string, level: number): { class: boolean, level: boolean, overall: boolean } {
    const test = { class: false, level: false, overall: false };
    for (const tempCharacterClassLevel of this.tempCharacter.classes) {
      if (characterClassId === 'CASTER'
        && ((tempCharacterClassLevel.classId === 'BARD' && tempCharacterClassLevel.level >= level)
        || (tempCharacterClassLevel.classId === 'CLERIC' && tempCharacterClassLevel.level >= level)
        || (tempCharacterClassLevel.classId === 'DRUID' && tempCharacterClassLevel.level >= level)
        || (tempCharacterClassLevel.classId === 'PALADIN' && tempCharacterClassLevel.level >= level)
        || (tempCharacterClassLevel.classId === 'RANGER' && tempCharacterClassLevel.level >= level)
        || (tempCharacterClassLevel.classId === 'SORCERER' && tempCharacterClassLevel.level >= level)
        || (tempCharacterClassLevel.classId === 'WIZARD' && tempCharacterClassLevel.level >= level))) {
        test.class = true;
        test.level = true;
      } else {
        if (this.tempCharacter.classes.find(data => data.classId === characterClassId) !== undefined
          && this.tempCharacter.classes.find(data => data.classId === characterClassId).classId === characterClassId) {
          test.class = true;
        }
        if (this.tempCharacter.classes.find(data => data.classId === characterClassId) !== undefined
          && this.tempCharacter.classes.find(data => data.classId === characterClassId).level >= level) {
          test.level = true;
        }
      }
    }
    if ( test.class && test.level ) { test.overall = true; }
    return test;
  }

  hasRequiredClass(classLevels: Array<{classId: string, level: number}>, checkClassId: string): boolean {
    for (const classLevel of classLevels) {
      if (classLevel.classId === checkClassId) {
        return true;
      }
    }
    return false;
  }

  getPrerequisiteClassLevel(prerequisiteClassLevel: Array<{classId: string, level: number}>, classCheckLogic: string): string {
    let tempString = '';
    let count = 0;
    for (const prereq of prerequisiteClassLevel) {
      count = count + 1;
      if ( this.meetsPrerequisiteClassLevel(prereq.classId, prereq.level).overall === false ) {
        tempString === '' ? tempString = prereq.classId + ' (' + prereq.level + ')'
          : tempString = tempString + ', ' + prereq.classId + ' (' + prereq.level + ')';
      }
    }
    if (classCheckLogic === 'OR' && count <= prerequisiteClassLevel.length) {
      tempString = '';
    }
    return tempString;
  }

  getPrerequisiteAbilityScores(abilityScore: AbilityScore): string {
    let tempString = '';
    if (this.tempCharacter.totalAbilityScores.strength < abilityScore.strength) {
      tempString === '' ? tempString = tempString + 'Strength (' + abilityScore.strength + ')'
        : tempString = tempString + ', Strength (' + abilityScore.strength + ')';
    }
    if (this.tempCharacter.totalAbilityScores.dexterity < abilityScore.dexterity) {
      tempString === '' ? tempString = tempString + 'Dexterity (' + abilityScore.dexterity + ')'
        : tempString = tempString + ', Dexterity (' + abilityScore.dexterity + ')';
    }
    if (this.tempCharacter.totalAbilityScores.constitution < abilityScore.constitution) {
      tempString === '' ? tempString = tempString + 'Constitution (' + abilityScore.constitution + ')'
        : tempString = tempString + ', Constitution (' + abilityScore.constitution + ')';
    }
    if (this.tempCharacter.totalAbilityScores.intelligence < abilityScore.intelligence) {
      tempString === '' ? tempString = tempString + 'Intelligence (' + abilityScore.intelligence + ')'
        : tempString = tempString + ', Intelligence (' + abilityScore.intelligence + ')';
    }
    if (this.tempCharacter.totalAbilityScores.wisdom < abilityScore.wisdom) {
      tempString === '' ? tempString = tempString + 'Wisdom (' + abilityScore.wisdom + ')'
        : tempString = tempString + ', Wisdom (' + abilityScore.wisdom + ')';
    }
    if (this.tempCharacter.totalAbilityScores.charisma < abilityScore.charisma) {
      tempString === '' ? tempString = tempString + 'Charisma (' + abilityScore.charisma + ')'
        : tempString = tempString + ', Charisma (' + abilityScore.charisma + ')';
    }
    return tempString;
  }

  getPrerequisiteBaseAttackBonus(baseAttackBonus: number): string {
    if (this.tempCharacter.baseAttackBonus < baseAttackBonus) {
      return 'Your BAB: (+' + this.tempCharacter.baseAttackBonus + '), Required BAB: (+' + baseAttackBonus + ')';
    }
  }

  meetsPrerequisiteSkillRanks(skillId: string, ranks: number): boolean {
    for (const skillRanks of this.tempCharacter.skillRanks) {
      if (skillRanks.skillId === skillId
        && skillRanks.ranks >= ranks) {
        return true;
      }
    }
    return false;
  }

  getPrerequisiteSkillRanks(skillRanks: Array<{skillId: string, ranks: number}>, skillCheckLogic: string): string {
    let tempString = '';
    let count = 0;
    for (const reqSkillRank of skillRanks) {
      if ( !this.meetsPrerequisiteSkillRanks(reqSkillRank.skillId, reqSkillRank.ranks) ) {
        count = count + 1;
        tempString === '' ? tempString = reqSkillRank.skillId + ' (' + reqSkillRank.ranks + ')'
        : tempString = tempString + ', ' + reqSkillRank.skillId + ' (' + reqSkillRank.ranks + ')';
      }
    }
    if (skillCheckLogic === 'OR' && count <= skillRanks.length) {
      tempString = '';
    }
    return tempString;
  }

  meetsPrerequisites(feat: FeatId): { feats: boolean, classLevel: boolean, abilityScores: boolean,
                                      baseAttackBonus: boolean, skillRank: boolean, overall: boolean } {
    const test = { feats: false, classLevel: false, abilityScores: false, baseAttackBonus: false, skillRank: false, overall: false };
    // has all feats
    if ( feat.prerequisites.feats.length === 0 ) {
      test.feats = true;
    } else if ( this.arrayContainsArray(this.tempCharacter.feats, feat.prerequisites.feats) ) {
      test.feats = true;
    }
    // has class / level
    if ( this.getPrerequisiteClassLevel(feat.prerequisites.classLevel, feat.prerequisites.classCheckLogic) === '' ) {
      test.classLevel = true;
    }
    // has ability score
    if ( this.tempCharacter.totalAbilityScores.strength >= feat.prerequisites.abilityScore.strength &&
      this.tempCharacter.totalAbilityScores.dexterity >= feat.prerequisites.abilityScore.dexterity &&
      this.tempCharacter.totalAbilityScores.constitution >= feat.prerequisites.abilityScore.constitution &&
      this.tempCharacter.totalAbilityScores.intelligence >= feat.prerequisites.abilityScore.intelligence &&
      this.tempCharacter.totalAbilityScores.wisdom >= feat.prerequisites.abilityScore.wisdom &&
      this.tempCharacter.totalAbilityScores.charisma >= feat.prerequisites.abilityScore.charisma ) {
      test.abilityScores = true;
    }
    // has base attack bonus
    if ( this.tempCharacter.baseAttackBonus >= feat.prerequisites.baseAttackBonus ) {
      test.baseAttackBonus = true;
    }
    // has skill ranks
    if ( this.getPrerequisiteSkillRanks(feat.prerequisites.skillRank, feat.prerequisites.classCheckLogic) === '' ) {
      test.skillRank = true;
    }
    if (test.feats && test.classLevel && test.abilityScores && test.baseAttackBonus && test.skillRank) {
      test.overall = true;
    }
    return test;
  }

  findOne(superset, subset) {
    return subset.some(function (value) {
      return superset.indexOf(value) >= 0;
    });
  }

  arrayContainsArray(superset, subset) {
    if (subset.length === 0) {
      return false;
    }
    return subset.every(function (value) {
      return (superset.indexOf(value) >= 0);
    });
  }

  getOtherFeatArray(featArray: FeatId[]): void {
    let array = Array<FeatId>();
    for (const feat of featArray) {
      array = [];
      array.push(feat);
      if (!this.findOne(this.skillFeats, array)
        && !this.findOne(this.skillFocusFeats, array)
        && !this.findOne(this.spellFocusFeats, array)
        && !this.findOne(this.mountedCombatFeats, array)
        && !this.findOne(this.metamagicFeats, array)
        && !this.findOne(this.itemCreationFeats, array)
        && !this.findOne(this.savingThrowFeats, array)) {
        // console.log(feat);
        this.otherFeats.push(feat);
      }
    }
    this.otherFeats.sort();
  }

  getFighterBonusFeatArray(featArray: FeatId[]): void {
    for (const feat of featArray) {
      if (feat.featType.includes('Fighter Bonus Feat')) {
        this.fighterBonusFeats.push(feat);
      }
    }
    this.fighterBonusFeats = this.fighterBonusFeats.sort(this.compareFeatNames);
  }

  compareFeatNames(a: FeatId, b: FeatId) {
    if ( a.name.substring( a.name.indexOf('('), a.name.indexOf(')') ) < b.name.substring( b.name.indexOf('('), b.name.indexOf(')') ) ) {
      return -1;
    }
    if ( a.name.substring( a.name.indexOf('('), a.name.indexOf(')') ) > b.name.substring( b.name.indexOf('('), b.name.indexOf(')') ) ) {
      return 1;
    }
    if ( a.name < b.name ) {
      return -1;
    }
    if ( a.name > b.name ) {
      return 1;
    }
    return 0;
  }

  getSkillFeatArray(featArray: FeatId[]): void {
    for (const feat of featArray) {
      if (!isEmptyObject(feat.benefit.skills)
        && !feat.id.includes('SKILLFOCUS')) {
        this.skillFeats.push(feat);
      }
    }
  }

  getSkillFocusFeatArray(featArray: FeatId[]): void {
    for (const feat of featArray) {
      if (!isEmptyObject(feat.benefit.skills)
        && feat.id.includes('SKILLFOCUS')) {
        this.skillFocusFeats.push(feat);
      }
    }
  }

  getSpellFocusFeatArray(featArray: FeatId[]): void {
    for (const feat of featArray) {
      if (feat.id.includes('SPELLFOCUS')) {
        this.spellFocusFeats.push(feat);
      }
    }
    this.spellFocusFeats.sort(this.compareSpellFocusFeatNames);
  }

  compareSpellFocusFeatNames(a: FeatId, b: FeatId) {
    if ( a.name.substring( a.name.indexOf('('), a.name.indexOf(')') )
      < b.name.substring( b.name.indexOf('('), b.name.indexOf(')') )) {
      return -1;
    }
    if ( a.name.substring( a.name.indexOf('('), a.name.indexOf(')') )
      > b.name.substring( b.name.indexOf('('), b.name.indexOf(')') )) {
      return 1;
    }
    if ( a.name < b.name) {
      return 1;
    }
    if ( a.name > b.name) {
      return -1;
    }
    return 0;
  }

  getSavingThrowFeats(featArray: FeatId[]): void {
    for (const feat of featArray) {
      if ( feat.benefit.savingThrow.fortitude > 0 || feat.benefit.savingThrow.reflex > 0 || feat.benefit.savingThrow.will > 0 ) {
        this.savingThrowFeats.push(feat);
      }
    }
  }

  getMountedCombatFeatsArray(featArray: FeatId[]): void {
    for (const feat of featArray) {
      if ( feat.id === 'MOUNTEDCOMBAT' || feat.prerequisites.feats.includes('MOUNTEDCOMBAT') ) {
        this.mountedCombatFeats.push(feat);
      }
    }
  }

  getMetamagicFeatsArray(featArray: FeatId[]): void {
    for (const feat of featArray) {
      if (feat.featType.includes('Metamagic')) {
        this.metamagicFeats.push(feat);
      }
    }
  }

  getItemCreationFeatsArray(featArray: FeatId[]): void {
    for (const feat of featArray) {
      if ( feat.featType.includes('Item Creation') ) {
        this.itemCreationFeats.push(feat);
      }
    }
    this.itemCreationFeats.sort(this.compareItemCreationFeats);
  }

  compareItemCreationFeats(a: FeatId, b: FeatId) {
    if ( a.prerequisites.classLevel[0].level < b.prerequisites.classLevel[0].level ) {
      return -1;
    }
    if ( a.prerequisites.classLevel[0].level > b.prerequisites.classLevel[0].level ) {
      return 1;
    }
    return 0;
  }

  completeCharacter(character: Character): void {
    this.characterService.addCharacter(character);
  }

}
