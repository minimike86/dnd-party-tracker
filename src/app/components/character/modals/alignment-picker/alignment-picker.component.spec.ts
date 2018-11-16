import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignmentPickerComponent } from './alignment-picker.component';

describe('AlignmentPickerComponent', () => {
  let component: AlignmentPickerComponent;
  let fixture: ComponentFixture<AlignmentPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlignmentPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignmentPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
