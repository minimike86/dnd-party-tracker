import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCharacterSkillComponent } from './new-character-skill.component';

describe('NewCharacterSkillComponent', () => {
  let component: NewCharacterSkillComponent;
  let fixture: ComponentFixture<NewCharacterSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCharacterSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCharacterSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
