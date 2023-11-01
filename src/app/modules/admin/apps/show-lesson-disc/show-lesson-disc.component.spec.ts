import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLessonDiscComponent } from './show-lesson-disc.component';

describe('ShowLessonDiscComponent', () => {
  let component: ShowLessonDiscComponent;
  let fixture: ComponentFixture<ShowLessonDiscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowLessonDiscComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowLessonDiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
