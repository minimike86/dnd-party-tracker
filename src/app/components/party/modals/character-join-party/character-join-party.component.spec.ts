import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterJoinPartyComponent } from './character-join-party.component';

describe('CharacterJoinPartyComponent', () => {
  let component: CharacterJoinPartyComponent;
  let fixture: ComponentFixture<CharacterJoinPartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterJoinPartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterJoinPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
