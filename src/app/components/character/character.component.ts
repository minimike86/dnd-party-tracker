import { Component, OnInit } from '@angular/core';
import {Character, CharacterId} from '../../models/character/character';
import { CharacterService } from '../../services/firebase/character/character.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  public uuid: string;
  public character: CharacterId;
  public validCharacter: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private characterSevice: CharacterService) {

    this.route.params.subscribe(params => {
      console.log('params: ', params);
      if (params['id'] !== undefined && params['id'] !== null) {
        this.uuid = params['id'];
        this.characterSevice.getCharacter(this.uuid).subscribe(data => {
          this.character = data;
          console.log('this.character: ', this.character);
          if (this.character.characterName !== undefined) {
            this.validCharacter = true;
          } else {
            this.validCharacter = false;
          }
        });
      } else {
        return null;
      }
    });

  }

  ngOnInit() {
  }

  // TODO: Get character class name from db for given classId field
  getCharClassAndLevelString(character: CharacterId): string {
    let tempStr = '';
    if (character.classes !== undefined) {
      for (const charClass of character.classes) {
        if (tempStr === '') {
          tempStr += charClass.classId + charClass.level;
        } else {
          tempStr += ' / ' + charClass.classId + charClass.level;
        }
      }
    }
    return tempStr;
  }

}
