import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeatComponent } from './add-feat.component';

describe('AddFeatComponent', () => {
  let component: AddFeatComponent;
  let fixture: ComponentFixture<AddFeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
