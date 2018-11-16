import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligionPickerComponent } from './religion-picker.component';

describe('ReligionPickerComponent', () => {
  let component: ReligionPickerComponent;
  let fixture: ComponentFixture<ReligionPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReligionPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligionPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
