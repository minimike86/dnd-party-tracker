import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CharacterService} from '../../../services/firebase/character/character.service';

@Component({
  selector: 'app-new-character-feat',
  templateUrl: './new-character-feat.component.html',
  styleUrls: ['./new-character-feat.component.css']
})
export class NewCharacterFeatComponent implements OnInit {

  constructor(private router: Router,
              public characterService: CharacterService) {
    if (this.characterService.tempCharacter.owner === null) {
      console.log('tempCharacter owner is null, returning to character creation step 1.');
      router.navigate( ['/character/new/'] );
    }
  }

  ngOnInit() {
  }

}
