import { Component, Input, OnInit } from '@angular/core';
import { Weapon } from '../../models/item/weapon';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {

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

}
