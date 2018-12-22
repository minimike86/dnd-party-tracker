import { Component, OnInit } from '@angular/core';
import { Feat, FeatId, SkillBenefit } from '../../../models/feat/feat';
import { FeatService } from '../../../services/firebase/feat/feat.service';
import { SkillId } from '../../../models/character/skill';
import { SkillService } from '../../../services/firebase/skill/skill.service';

@Component({
  selector: 'app-add-feat',
  templateUrl: './add-feat.component.html',
  styleUrls: ['./add-feat.component.css']
})
export class AddFeatComponent implements OnInit {

  public feat: Feat;
  public feats: FeatId[];
  public prerequisite: string;
  public skills: SkillId[];
  public skillBenefit: SkillBenefit;

  constructor(private featService: FeatService,
              private skillService: SkillService) {
    featService.getFeats().subscribe(featsData => {
      this.feats = featsData;
    });
    skillService.getSkills().subscribe(skillsData => {
      this.skills = skillsData;
    });
  }

  ngOnInit() {
    this.feat = {
      name: '',
      description: '',
      featType: 'General',
      categories: [],
      rulebook: 'Player\'s Handbook 3.5e',
      benefit: {
        skills: new Map<string, number>(),
        proficiencies: null
      },
      special: null,
      normal: null,
      prerequisites: []
    };

    this.prerequisite = null;

    this.skillBenefit = {
      skillId: null,
      skillBonus: 2
    };

  }

  addSkillBenefit() {
    // console.log(this.skillBenefit.skillId, this.skillBenefit.skillBonus);
    if (this.skillBenefit.skillId !== undefined && this.skillBenefit.skillId !== null) {
      this.feat.benefit.skills.set(this.skillBenefit.skillId, this.skillBenefit.skillBonus);
    }
  }

  clearSkillBenefit() {
    this.feat.benefit.skills = new Map<string, number>();
  }

  addPrerequisite() {
    console.log('addPrerequisite: ', this.prerequisite);
    if (this.prerequisite !== undefined && this.prerequisite !== null) {
      this.feat.prerequisites.push(this.prerequisite);
    }
  }

  clearPrerequisite() {
    this.feat.prerequisites = [];
  }

  addFeat() {
    if ( this.feat.name !== ''
      && this.feat.description !== ''
      && (this.feat.benefit.skills.size > 0
        || this.feat.name.includes('Proficiency')) ) {
      console.log('Adding feat: ', this.feat)
      // Convert benefit.skills map
      this.feat.benefit.skills = this.convertMapToObj(this.feat.benefit.skills);
      // Add benefit.proficiencies
      if (this.feat.name.includes('Proficiency')) {
        this.feat.benefit.proficiencies = this.feat.name;
      }
      // Add the new feat
      this.featService.addFeat(this.feat);
      this.ngOnInit();
    }
  }

  convertMapToObj(strMap) {
    const obj = Object.create(null);
    strMap.forEach((k, v) => {
      obj[v] = k;
    });
    return obj;
  }

}
