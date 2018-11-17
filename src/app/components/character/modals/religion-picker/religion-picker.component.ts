import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CharacterService } from '../../../../services/firebase/character/character.service';
import { RaceService } from '../../../../services/firebase/race/race.service';
import { RaceId } from '../../../../models/character/race';
import { CharacterClassService } from '../../../../services/firebase/character-class/character-class.service';
import { CharacterClassId } from '../../../../models/character/character-class';
import { ReligionService } from '../../../../services/firebase/religion/religion.service';
import { ReligionId } from '../../../../models/character/religion';
import { getAlignmentAcronym } from '../../../../enums/enum-alignment';

@Component({
  selector: 'app-religion-picker',
  templateUrl: './religion-picker.component.html',
  styleUrls: ['./religion-picker.component.css']
})
export class ReligionPickerComponent implements OnInit {

  public religionDescription: string;
  public religions: Array<ReligionId>;
  public checkAllReligions: boolean;
  public races: Array<RaceId>;
  public classes: Array<CharacterClassId>;
  public worshipedByRaceText: string;
  public worshipedByClassText: string;

  constructor(public characterService: CharacterService,
              public raceService: RaceService,
              public characterClassService: CharacterClassService,
              public religionService: ReligionService,
              public activeModal: NgbActiveModal) {
    raceService.getRaces().subscribe(data => {
      this.races = data;
    });
    characterClassService.getClasses().subscribe(data => {
      this.classes = data;
    });
    religionService.getReligions().subscribe(data => {
      this.religions = data;
    });
  }

  ngOnInit() {
    this.religionDescription = '';
    this.checkAllReligions = false;
  }

  getFilteredReligions(): Array<ReligionId> {
    if (this.checkAllReligions) {
      return this.religions;
    } else {
      if (this.religions !== undefined && this.characterService.tempCharacter.classes[0] !== undefined
        && this.characterService.tempCharacter.classes[0].classId === 'CLERIC') {
        return this.religions.filter(rel =>
          // Deities By Race
          (rel.worshipedBy.races !== undefined
            && rel.worshipedBy.races.includes(this.characterService.tempCharacter.raceId))
          ||
          // Deities By Class
          (rel.worshipedBy.classes !== undefined
            && rel.worshipedBy.classes.includes(this.characterService.tempCharacter.classes[0].classId))
          ||
          // Deities By Alignment
          (this.characterService.tempCharacter.alignment !== null
            && rel.clericAlignments.includes(getAlignmentAcronym(this.characterService.tempCharacter.alignment)))
        );
      } else if (this.religions !== undefined) {
        return this.religions.filter(rel =>
          // Deities By Race
          (rel.worshipedBy.races !== undefined
            && rel.worshipedBy.races.includes(this.characterService.tempCharacter.raceId))
          ||
          // Deities By Class
          (rel.worshipedBy.classes !== undefined && this.characterService.tempCharacter.classes.length >= 1
            && rel.worshipedBy.classes.includes(this.characterService.tempCharacter.classes[0].classId))
        );
      }
    }
  }
  getWorshipedByRaceText(races: Array<string>): string {
    this.worshipedByRaceText = '';
    if (this.races !== undefined) {
      for (let i = 0; i < races.length; i++) {
        switch (i) {
          case 0:
            this.worshipedByRaceText += (this.races.find(race => race.id === races[i]).name
              .replace(/f$/g, 've') + 's').replace(/eds$/g, 'ed');
            break;
          case races.length - 1:
            this.worshipedByRaceText += ', and ' + (this.races.find(race => race.id === races[i]).name
              .replace(/f$/g, 've') + 's').replace(/eds$/g, 'ed');
            break;
          default:
            this.worshipedByRaceText += ', ' + (this.races.find(race => race.id === races[i]).name
              .replace(/f$/g, 've') + 's').replace(/eds$/g, 'ed');
        }
      }
    }
    return this.worshipedByRaceText;
  }

  getWorshipedByClassText(classes: Array<string>): string {
    this.worshipedByClassText = '';
    if (this.classes !== undefined) {
      for (let i = 0; i < classes.length; i++) {
        switch (i) {
          case 0:
            this.worshipedByClassText += this.classes.find(cls => cls.id === classes[i]).name + 's';
            break;
          case classes.length - 1:
            this.worshipedByClassText += ', and ' + this.classes.find(cls => cls.id === classes[i]).name + 's';
            break;
          default:
            this.worshipedByClassText += ', ' + this.classes.find(cls => cls.id === classes[i]).name + 's';
        }
      }
    }
    return this.worshipedByClassText;
  }

  selectedReligion(religionId: string): void {
    if (!this.characterService.tempCharacter.religion.includes(religionId)) {
      this.characterService.tempCharacter.religion.push(religionId);
    }
    this.activeModal.close();
  }

  removeReligions(): void {
    this.characterService.tempCharacter.religion = [];
    this.activeModal.close();
  }

}
