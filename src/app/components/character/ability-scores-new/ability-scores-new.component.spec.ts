import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityScoresNewComponent } from './ability-scores-new.component';

describe('AbilityScoresNewComponent', () => {
  let component: AbilityScoresNewComponent;
  let fixture: ComponentFixture<AbilityScoresNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbilityScoresNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbilityScoresNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
