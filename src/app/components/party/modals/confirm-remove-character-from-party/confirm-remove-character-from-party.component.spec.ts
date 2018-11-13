import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRemoveCharacterFromPartyComponent } from './confirm-remove-character-from-party.component';

describe('ConfirmRemoveCharacterFromPartyComponent', () => {
  let component: ConfirmRemoveCharacterFromPartyComponent;
  let fixture: ComponentFixture<ConfirmRemoveCharacterFromPartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmRemoveCharacterFromPartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRemoveCharacterFromPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
