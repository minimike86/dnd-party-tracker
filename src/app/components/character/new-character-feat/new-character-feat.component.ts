import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '../../../services/firebase/character/character.service';
import { FeatService } from '../../../services/firebase/feat/feat.service';
import { FeatId } from '../../../models/feat/feat';

@Component({
  selector: 'app-new-character-feat',
  templateUrl: './new-character-feat.component.html',
  styleUrls: ['./new-character-feat.component.css']
})
export class NewCharacterFeatComponent implements OnInit {

  public feats: FeatId[];

  constructor(private router: Router,
              public characterService: CharacterService,
              public featService: FeatService) {
    if (this.characterService.tempCharacter.owner === null) {
      console.log('tempCharacter owner is null, returning to character creation step 1.');
      router.navigate( ['/character/new/'] );
    }
    this.featService.getFeats().subscribe(data => {
      this.feats = data;
    });
  }

  ngOnInit() {
  }

}
