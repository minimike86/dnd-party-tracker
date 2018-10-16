import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatOptionsComponent } from './combat-options.component';

describe('CombatOptionsComponent', () => {
  let component: CombatOptionsComponent;
  let fixture: ComponentFixture<CombatOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombatOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombatOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
