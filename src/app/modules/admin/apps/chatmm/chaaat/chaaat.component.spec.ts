import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaaatComponent } from './chaaat.component';

describe('ChaaatComponent', () => {
  let component: ChaaatComponent;
  let fixture: ComponentFixture<ChaaatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChaaatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChaaatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
