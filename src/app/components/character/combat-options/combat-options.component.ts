import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../models/item/item';

@Component({
  selector: 'app-combat-options',
  templateUrl: './combat-options.component.html',
  styleUrls: ['./combat-options.component.css']
})
export class CombatOptionsComponent implements OnInit {

  @Input() weapons: Array<[Item]>;

  constructor() { }

  ngOnInit() {
  }

}
