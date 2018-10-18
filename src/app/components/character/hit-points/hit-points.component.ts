import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-hit-points',
  templateUrl: './hit-points.component.html',
  styleUrls: ['./hit-points.component.css']
})
export class HitPointsComponent implements OnInit {

  @Input() totalHitPoints: number;
  @Input() currentHitPoints: number;

  constructor() {}

  ngOnInit() {
    this.currentHitPoints = Math.floor((Math.random() * this.totalHitPoints) + 1);
  }

  getHitPointPercentage(): number {
    return Math.floor((this.currentHitPoints / this.totalHitPoints) * 100);
  }

}
