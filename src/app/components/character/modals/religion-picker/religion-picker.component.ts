import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CharacterService } from '../../../../services/firebase/character/character.service';

@Component({
  selector: 'app-religion-picker',
  templateUrl: './religion-picker.component.html',
  styleUrls: ['./religion-picker.component.css']
})
export class ReligionPickerComponent implements OnInit {

  public religionDescription: string;

  constructor(public characterService: CharacterService,
              public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.religionDescription = '';
  }

  selectedReligion(religion: string): void {
    this.characterService.tempCharacter.religion = religion;
    this.activeModal.close();
  }

  setReligionDescription(religion: string): void {
    this.religionDescription = religion;
  }

}
