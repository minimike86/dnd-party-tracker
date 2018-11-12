import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeletePartyComponent } from './confirm-delete-party.component';

describe('ConfirmDeletePartyComponent', () => {
  let component: ConfirmDeletePartyComponent;
  let fixture: ComponentFixture<ConfirmDeletePartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeletePartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeletePartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
