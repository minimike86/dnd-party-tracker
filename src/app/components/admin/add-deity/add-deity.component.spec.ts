import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeityComponent } from './add-deity.component';

describe('AddDeityComponent', () => {
  let component: AddDeityComponent;
  let fixture: ComponentFixture<AddDeityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
