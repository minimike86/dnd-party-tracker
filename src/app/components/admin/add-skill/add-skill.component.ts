import { Component, OnInit } from '@angular/core';
import { Skill } from '../../../models/character/skill';
import { SkillService } from '../../../services/firebase/skill/skill.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {

  public skill: Skill;
  public synergies: string;

  constructor(public skillService: SkillService) {
  }

  ngOnInit() {

    this.skill = {
      name: '',
      keyAbility: '',
      untrained: false,
      armorCheckPenaltyApplies: false,
      dblAcPenaltyApplies: false,
      synergies: []
    };
    this.synergies = '';

  }

  addSkill() {
    this.skill.synergies = this.synergies !== '' ? this.synergies.split(',') : [];
    this.skillService.addSkill(this.skill);
    this.ngOnInit();
  }

}
