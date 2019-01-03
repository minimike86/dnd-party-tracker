import { Component, OnInit } from '@angular/core';
import { CharacterId } from '../../../models/character/character';
import { CharacterService } from '../../../services/firebase/character/character.service';
import { AuthService } from '../../../services/firebase/auth/auth.service';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  public currentUser: User;
  public characters: CharacterId[];

  constructor(private authService: AuthService,
              public router: Router,
              private characterService: CharacterService) {

    authService.user$.subscribe(user => {
      this.currentUser = user;
      characterService.getCharacters().subscribe(data => {
        this.characters = data.filter( chars => chars.owner === this.currentUser.uid );
      });
    });

  }

  ngOnInit() {
  }

  viewCharacter(characterId: string): void {
    this.router.navigate( ['/character/id/' + characterId] );
  }

  editCharacter() {
    //
  }

  deleteCharacter(characterId: string): void {
    this.characterService.deleteCharacter(characterId);
  }

}
