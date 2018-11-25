import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CharacterService } from '../../../services/firebase/character/character.service';
import { RaceService } from '../../../services/firebase/race/race.service';
import { CharacterClassService } from '../../../services/firebase/character-class/character-class.service';
import { SkillService } from '../../../services/firebase/skill/skill.service';
import { Character } from '../../../models/character/character';
import { RaceId } from '../../../models/character/race';
import { CharacterClassId } from '../../../models/character/character-class';
import { SkillId } from '../../../models/character/skill';
import {getAbilityModifier} from '../../../models/character/ability-scores';

@Component({
  selector: 'app-new-character-skill',
  templateUrl: './new-character-skill.component.html',
  styleUrls: ['./new-character-skill.component.css']
})
export class NewCharacterSkillComponent implements OnInit {

  public character: Character;
  public races: RaceId[];
  public classes: CharacterClassId[];
  public skills: SkillId[];
  public skillRanks: {
    skillId: SkillId,
    ranks: number,
    misc: number
  }[];

  public toSpendSkillPoints: number;
  public maxSkillPoints: number;

  public maxClassRanks: number;
  public maxCrossClassRanks: number;

  constructor(private router: Router,
              public characterService: CharacterService,
              public raceService: RaceService,
              private classService: CharacterClassService,
              private skillsService: SkillService,
              private modalService: NgbModal) {

    raceService.getRaces().subscribe(data => {
      this.races = data;
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
      },
      err => console.log('Error :: ' + err)
    );
    skillsService.getSkills().subscribe(data => {
      this.skills = data;
    })
    if (this.characterService.tempCharacter.owner === null) {
      console.log('tempCharacter owner is null, returning to character creation step 1.');
      // router.navigate( ['/character/new/'] );
    }

  }

  ngOnInit() {
    this.toSpendSkillPoints = 0;
    this.maxSkillPoints = 0;
    this.maxClassRanks = 0;
    this.maxCrossClassRanks = 0;
  }

  getAbilityModifier(abilityScore: number): number {
    return Math.floor(abilityScore / 2) - 5;
  }

}
