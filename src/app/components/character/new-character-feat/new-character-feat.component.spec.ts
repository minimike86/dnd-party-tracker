import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCharacterFeatComponent } from './new-character-feat.component';

describe('NewCharacterFeatComponent', () => {
  let component: NewCharacterFeatComponent;
  let fixture: ComponentFixture<NewCharacterFeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCharacterFeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCharacterFeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
