import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCharacterClassComponent } from './new-character-class.component';

describe('NewCharacterClassComponent', () => {
  let component: NewCharacterClassComponent;
  let fixture: ComponentFixture<NewCharacterClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCharacterClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCharacterClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
