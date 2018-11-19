import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRaceComponent } from './add-race.component';

describe('AddRaceComponent', () => {
  let component: AddRaceComponent;
  let fixture: ComponentFixture<AddRaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
