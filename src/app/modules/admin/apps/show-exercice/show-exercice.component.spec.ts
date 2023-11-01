import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowExerciceComponent } from './show-exercice.component';

describe('ShowExerciceComponent', () => {
  let component: ShowExerciceComponent;
  let fixture: ComponentFixture<ShowExerciceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowExerciceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
