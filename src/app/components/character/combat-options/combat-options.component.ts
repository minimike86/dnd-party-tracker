import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../models/item/item';

@Component({
  selector: 'app-combat-options',
  templateUrl: './combat-options.component.html',
  styleUrls: ['./combat-options.component.css']
})
export class CombatOptionsComponent implements OnInit {

  @Input() bab: number;
  @Input() weapons: Array<[Item]>;

  constructor() { }

  ngOnInit() {
  }

  getBabString(): string {
    let tempStr =  '';
    if (this.bab >= 0) {
      for (let i = 0; i <= Math.round(this.bab / 6); i++) {
        if (tempStr ===  '') {
          tempStr = '+' + this.bab;
        } else {
          tempStr += '/+' + (this.bab - (5 * i));
        }
      }
    } else {
      for (let i = 0; i >= Math.round(this.bab / 6); i--) {
        if (tempStr ===  '') {
          tempStr = '' + this.bab;
        } else {
          tempStr += '/' + (this.bab - (5 * i));
        }
      }
    }
    return tempStr;
  }

}
