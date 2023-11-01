import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllChapterComponent } from './show-all-chapter.component';

describe('ShowAllChapterComponent', () => {
  let component: ShowAllChapterComponent;
  let fixture: ComponentFixture<ShowAllChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllChapterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
