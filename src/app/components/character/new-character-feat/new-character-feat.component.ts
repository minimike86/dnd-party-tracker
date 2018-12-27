import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '../../../services/firebase/character/character.service';
import { FeatService } from '../../../services/firebase/feat/feat.service';
import { FeatId} from '../../../models/feat/feat';
import { isEmptyObject } from '@angular/fire/database-deprecated/utils';

@Component({
  selector: 'app-new-character-feat',
  templateUrl: './new-character-feat.component.html',
  styleUrls: ['./new-character-feat.component.css']
})
export class NewCharacterFeatComponent implements OnInit {

  public feats: FeatId[];
  public skillFeats: FeatId[];
  public skillFocusFeats: FeatId[];
  public metamagicFeats: FeatId[];
  public itemCreationFeats: FeatId[];
  public armorProficiencyFeats: FeatId[];
  public weaponProficiencyFeats: FeatId[];

  public fighterBonusFeats: FeatId[];

  public firstLevelFeat: FeatId;
  public humanBonusFeat: FeatId;
  public fighterBonusFeat: FeatId;

  constructor(private router: Router,
              private featService: FeatService,
              public characterService: CharacterService) {
    if (this.characterService.tempCharacter.owner === null) {
      console.log('tempCharacter owner is null, returning to character creation step 1.');
      // router.navigate( ['/character/new/'] );
    }
    this.featService.getFeats().subscribe(featData => {
      this.feats = featData;
      this.getSkillFeatArray(this.feats);
      this.getSkillFocusFeatArray(this.feats);
      this.getMetamagicFeatsArray(this.feats);
      this.getItemCreationFeatsArray(this.feats);
    });
  }

  ngOnInit() {
    this.skillFeats = [];
    this.skillFocusFeats = [];
    this.metamagicFeats = [];
    this.itemCreationFeats = [];

    this.firstLevelFeat = null;
    this.humanBonusFeat = null;
    this.fighterBonusFeat = null;
  }

  getSkillFeatArray(featArray: FeatId[]): void {
    for (const feat of featArray) {
      if (!isEmptyObject(feat.benefit.skills)
        && !feat.id.includes('SKILLFOCUS')) {
        this.skillFeats.push(feat);
      }
    }
  }

  getSkillFocusFeatArray(featArray: FeatId[]): void {
    for (const feat of featArray) {
      if (!isEmptyObject(feat.benefit.skills)
        && feat.id.includes('SKILLFOCUS')) {
        this.skillFocusFeats.push(feat);
      }
    }
  }

  getMetamagicFeatsArray(featArray: FeatId[]): void {
    for (const feat of featArray) {
      if (feat.featType.includes('Metamagic')) {
        this.metamagicFeats.push(feat);
      }
    }
  }

  getItemCreationFeatsArray(featArray: FeatId[]): void {
    for (const feat of featArray) {

      if ( feat.featType.includes('Item Creation')
        && !isEmptyObject(feat.prerequisites.classLevel) ) {

        let isFirstLevelCasterLevelFeat = false;
        Object.keys(feat.prerequisites.classLevel).forEach(function(key) {
          // console.log(key, feat.prerequisites.classLevel[key]);
          if (key === 'CASTER' && feat.prerequisites.classLevel[key] <= 1) {
            isFirstLevelCasterLevelFeat = true;
          }
        });

        console.log(isFirstLevelCasterLevelFeat);
        if (isFirstLevelCasterLevelFeat) {
          console.log(this.itemCreationFeats, isFirstLevelCasterLevelFeat, feat);
          this.itemCreationFeats.push(feat);
          console.log(this.itemCreationFeats, isFirstLevelCasterLevelFeat, feat);
        }

      }

    }
  }

}
