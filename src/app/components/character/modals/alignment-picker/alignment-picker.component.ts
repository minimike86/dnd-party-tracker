import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CharacterService } from '../../../../services/firebase/character/character.service';


@Component({
  selector: 'app-alignment-picker',
  templateUrl: './alignment-picker.component.html',
  styleUrls: ['./alignment-picker.component.css']
})
export class AlignmentPickerComponent implements OnInit {

  public alignmentDescription: string;

  constructor(public characterService: CharacterService,
              public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.alignmentDescription = '';
  }

  selectedAlignment(alignment: string): void {
    this.characterService.tempCharacter.alignment = alignment;
    this.activeModal.close();
  }

  setAlignmentDescription(description: string): void {
    this.alignmentDescription = description;
  }

}
