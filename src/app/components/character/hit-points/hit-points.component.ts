import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-hit-points',
  templateUrl: './hit-points.component.html',
  styleUrls: ['./hit-points.component.css']
})
export class HitPointsComponent implements OnInit {

  @Input() totalHitPoints: number;
  @Input() currentHitPoints: number;
  @Input() healthStatus: string;

  constructor() {}

  ngOnInit() {
    this.currentHitPoints = Math.floor((Math.random() * this.totalHitPoints) + 1);
  }

  getHitPointPercentage(): number {
    if (this.currentHitPoints > 0) {
      return Math.floor((this.currentHitPoints / this.totalHitPoints) * 100);
    } else {
      return Math.floor((this.currentHitPoints + 10 / 10) * 100);
    }
  }

  subtractHitPoints(): number {
    if (this.currentHitPoints > -10) {
      console.log('decreasing health by 1.');
      return this.currentHitPoints -= 1;
    }
  }

  addHitPoints(): number {
    if (this.currentHitPoints < this.totalHitPoints) {
      console.log('increasing health by 1.');
      return this.currentHitPoints += 1;
    }
  }

}
