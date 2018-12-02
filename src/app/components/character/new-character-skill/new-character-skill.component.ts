import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import { CharacterService } from '../../../services/firebase/character/character.service';
import { RaceService } from '../../../services/firebase/race/race.service';
import { CharacterClassService } from '../../../services/firebase/character-class/character-class.service';
import { SkillService } from '../../../services/firebase/skill/skill.service';
import { Character } from '../../../models/character/character';
import { RaceId } from '../../../models/character/race';
import { CharacterClassId } from '../../../models/character/character-class';
import { SkillId } from '../../../models/character/skill';

@Component({
  selector: 'app-new-character-skill',
  templateUrl: './new-character-skill.component.html',
  styleUrls: ['./new-character-skill.component.css']
})
export class NewCharacterSkillComponent implements OnInit {

  public characterRaceId: RaceId;
  public characterClassId: CharacterClassId;

  public races: RaceId[];
  public classes: CharacterClassId[];
  public skills: SkillId[];

  public skillRanks: {
    skillId: string,
    ranks: number,
    misc: number
  }[];

  public toSpendSkillPoints: number;
  public maxSkillPoints: number;

  public maxClassRanks: number;
  public maxCrossClassRanks: number;

  @ViewChild('popover') public popover: NgbPopover;

  constructor(private router: Router,
              public characterService: CharacterService,
              public raceService: RaceService,
              private classService: CharacterClassService,
              private skillsService: SkillService,
              private modalService: NgbModal) {

    if (this.characterService.tempCharacter.owner === null) {
      console.log('tempCharacter owner is null, returning to character creation step 1.');
      router.navigate( ['/character/new/'] );
    }

    raceService.getRaces().subscribe(data => {
      this.races = data;
      if (this.races !== undefined) {
        this.characterRaceId = this.races.find(race => race.id === this.characterService.tempCharacter.raceId);
      }
      this.ngOnInit();
    });
    classService.getClasses().subscribe(
      value => {
        // Set races from firebase db
        this.classes = value;
        // Sort races by name
        this.classes.sort((a, b) => {
          const x = a.name.toLowerCase();
          const y = b.name.toLowerCase();
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
        if ( this.classes !== undefined && this.characterService.tempCharacter.classes.length > 0 ) {
          this.characterClassId = this.classes.find(cls => cls.id === this.characterService.tempCharacter.classes[0].classId);
        }
        this.ngOnInit();
      },
      err => console.log('Error :: ' + err)
    );
    skillsService.getSkills().subscribe(data => {
      this.skills = data;
      for ( const skill of this.skills ) {
        this.skillRanks.push(
          {
            skillId: skill.id,
            ranks: 0,
            misc: this.getRacialSkillMiscBonus(skill).bonus
          }
        );
      }
    });

  }

  ngOnInit() {
    if (this.characterRaceId !== undefined && this.characterClassId !== undefined) {
      this.maxSkillPoints = this.getMaxSkillPoints(
        this.characterClassId,
        this.characterService.tempCharacter.totalAbilityScores.intelligence,
        this.characterRaceId
      );
      this.toSpendSkillPoints = 0;
    } else {
      this.maxSkillPoints = 0;
      this.toSpendSkillPoints = 0;
    }
    this.skillRanks = [];
    this.maxClassRanks = 4;
    this.maxCrossClassRanks = 2;
  }

  getAbilityModifier(abilityScore: number): number {
    return Math.floor(abilityScore / 2) - 5;
  }

  getMaxSkillPoints(cls: CharacterClassId, intelligence: number, race: RaceId): number {
    if (cls !== undefined) {
      return ((cls.skillPointsPerLevel + this.getAbilityModifier(intelligence)) * 4) + race.extraSkillPointsFirstLevel;
    } else {
      return 0;
    }
  }

  getSkillModifier(skillId: SkillId): number {
    let abilityMod = 0;
    switch (skillId.keyAbility) {
      case 'strength': abilityMod = this.getAbilityModifier(this.characterService.tempCharacter.totalAbilityScores.strength); break;
      case 'dexterity': abilityMod = this.getAbilityModifier(this.characterService.tempCharacter.totalAbilityScores.dexterity); break;
      case 'constitution': abilityMod = this.getAbilityModifier(this.characterService.tempCharacter.totalAbilityScores.constitution); break;
      case 'intelligence': abilityMod = this.getAbilityModifier(this.characterService.tempCharacter.totalAbilityScores.intelligence); break;
      case 'wisdom': abilityMod = this.getAbilityModifier(this.characterService.tempCharacter.totalAbilityScores.wisdom); break;
      case 'charisma': abilityMod = this.getAbilityModifier(this.characterService.tempCharacter.totalAbilityScores.charisma); break;
      default: abilityMod = 0;
    }
    const RANKS = this.skillRanks.find(skill => skill.skillId === skillId.id).ranks;
    const MISC = this.skillRanks.find(skill => skill.skillId === skillId.id).misc;
    return abilityMod + RANKS + MISC;
  }

  updateSkillRanks(skill: SkillId, index: number, ranks: number): void {
    const PRE_SKILL_RANK = this.skillRanks[index].ranks;
    if (this.isClassSkill(skill)) {
      this.skillRanks[index].ranks = ranks;
    } else {
      this.skillRanks[index].ranks = ranks * 0.5;
    }
    const POST_SKILL_RANK = this.skillRanks[index].ranks;
    if ( PRE_SKILL_RANK > POST_SKILL_RANK ) {
      this.toSpendSkillPoints = this.toSpendSkillPoints - 1;
    } else if ( POST_SKILL_RANK > PRE_SKILL_RANK ) {
      this.toSpendSkillPoints = this.toSpendSkillPoints + 1;
    }
  }

  getRacialSkillMiscBonus(skill: SkillId): {bonus: number, type: string, vs?: string} {
    if (this.characterRaceId !== undefined) {
      return this.characterRaceId.skillRollBonuses.find(bonus => bonus.type === skill.id) !== undefined
        ? this.characterRaceId.skillRollBonuses.find(bonus => bonus.type === skill.id)
        : {bonus: 0, type: '', vs: ''};
    } else {
      return {bonus: 0, type: '', vs: ''};
    }
  }

  updateSkillMiscs(skill: SkillId, index: number, ranks: number): void {
    this.skillRanks[index].misc = ranks;
  }

  isClassSkill(skill: SkillId): boolean {
    return this.characterClassId.classSkills.includes(skill.id);
  }

  selectFeats() {
    if (this.toSpendSkillPoints === this.maxSkillPoints) {
      this.router.navigate( ['/character/new/feats'] );
    } else {
      this.popover.open();
    }
  }

}
