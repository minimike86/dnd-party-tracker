import { Component, Input, OnInit } from '@angular/core';
import { Weapon } from '../../models/item/weapon';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {

  @Input() bab: number;
  @Input() weapons: Array<Weapon>;

  constructor() { }

  ngOnInit() {
  }

  getAmmunitionString(weaponId: number): string {
    let tempStr = '';
    for (const weapon of this.weapons) {
      // console.log(weapon);
      if (weapon.id === weaponId && weapon.ammunition != null) {
        for (const ammoType of weapon.ammunition) {
          // console.log(ammoType);
          if (tempStr === '') {
            tempStr += ammoType.ammoType + ' (' + ammoType.quantity + ')';
          } else {
            tempStr += ', ' + ammoType.ammoType + ' (' + ammoType.quantity + ')';
          }
        }
      }
    }
    return tempStr;
  }

  getAttackString(weaponBonus: number): string {
    let tempStr =  '';
    if (this.bab >= 0) {
      for (let i = 0; i <= Math.round(this.bab / 6); i++) {
        if (tempStr ===  '') {
          tempStr = '+' + (this.bab + weaponBonus);
        } else {
          tempStr += '/+' + ((this.bab + weaponBonus) - (5 * i));
        }
      }
    } else {
      for (let i = 0; i >= Math.round(this.bab / 6); i--) {
        if (tempStr ===  '') {
          tempStr = '' + (this.bab + weaponBonus);
        } else {
          tempStr += '/' + ((this.bab + weaponBonus) - (5 * i));
        }
      }
    }
    return tempStr;
  }

}
