import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CharacterService } from '../../../../services/firebase/character/character.service';
import { CharacterClassService } from '../../../../services/firebase/character-class/character-class.service';
import { CharacterClassId } from '../../../../models/character/character-class';
import { ReligionService } from '../../../../services/firebase/religion/religion.service';
import { ReligionId } from '../../../../models/character/religion';

@Component({
  selector: 'app-religion-picker',
  templateUrl: './religion-picker.component.html',
  styleUrls: ['./religion-picker.component.css']
})
export class ReligionPickerComponent implements OnInit {

  public religionDescription: string;
  public religions: Array<ReligionId>;
  public classes: Array<CharacterClassId>;
  public worshipedByClassText: string;

  constructor(public characterService: CharacterService,
              public characterClassService: CharacterClassService,
              public religionService: ReligionService,
              public activeModal: NgbActiveModal) {
    religionService.getReligions().subscribe(data => {
      this.religions = data;
    });
    characterClassService.getClasses().subscribe(data => {
      this.classes = data;
    });
  }

  ngOnInit() {
    this.religionDescription = '';
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
