import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CharacterService } from '../../../../services/firebase/character/character.service';
import { CharacterClassService } from '../../../../services/firebase/character-class/character-class.service';
import { CharacterClass, CharacterClassId } from '../../../../models/character/character-class';


@Component({
  selector: 'app-alignment-picker',
  templateUrl: './alignment-picker.component.html',
  styleUrls: ['./alignment-picker.component.css']
})
export class AlignmentPickerComponent implements OnInit {

  public alignmentDescription: string;
  public classList: CharacterClassId[];
  public alignmentWhitelist: [string];

  constructor(public characterClassService: CharacterClassService,
              public characterService: CharacterService,
              public activeModal: NgbActiveModal) {
    characterClassService.getClasses().subscribe(data => {
      this.classList = data;
      this.alignmentWhitelist = this.classList !== null && this.characterService.tempCharacter.classes !== null
        ? this.classList.find(classItem => classItem.id === this.characterService.tempCharacter.classes[0].classId).alignmentWhitelist
        : [''];
    });
  }

  ngOnInit() {
    this.alignmentDescription = '';
    this.alignmentWhitelist = [''];
  }

  selectedAlignment(alignment: string): void {
    this.characterService.tempCharacter.alignment = alignment;
    this.activeModal.close();
  }

  setAlignmentDescription(description: string): void {
    this.alignmentDescription = description;
  }

}
