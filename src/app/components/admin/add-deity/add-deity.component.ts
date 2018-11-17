import { Component, OnInit } from '@angular/core';
import { ReligionService } from '../../../services/firebase/religion/religion.service';
import { Religion } from '../../../models/character/religion';

@Component({
  selector: 'app-add-deity',
  templateUrl: './add-deity.component.html',
  styleUrls: ['./add-deity.component.css']
})
export class AddDeityComponent implements OnInit {

  public religion: Religion;
  public clericAlignments: string;
  public deityOf: string;
  public domains: string;
  public titles: string;
  public worshipedByClasses: string;
  public worshipedByRaces: string;

  constructor(public religionService: ReligionService) {
  }

  ngOnInit() {
    this.clericAlignments = '';
    this.deityOf = '';
    this.domains = '';
    this.titles = '';
    this.worshipedByClasses = '';
    this.worshipedByRaces = '';
    this.religion = {
      alignment: '',
      clericAlignments: null,
      deityOf: null,
      domains: null,
      favoredWeapon: '',
      holySymbol: '',
      homePlane: '',
      image: '',
      name: '',
      titles: null,
      worshipedBy: {
        classes: null,
        races: null
      }
    };
  }

  addDeity(): void {
    this.religion.clericAlignments = this.clericAlignments.split(',');
    this.religion.deityOf = this.deityOf.split(',');
    this.religion.domains = this.domains.split(',');
    this.religion.titles = this.titles.split(',');
    this.religion.worshipedBy.classes = this.worshipedByClasses.split(',');
    this.religion.worshipedBy.races = this.worshipedByRaces.split(',');
    this.religionService.addReligion(this.religion);
    this.ngOnInit();
  }

}
