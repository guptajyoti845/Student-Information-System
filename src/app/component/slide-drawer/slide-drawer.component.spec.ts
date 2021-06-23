import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideDrawerComponent } from './slide-drawer.component';

describe('SlideDrawerComponent', () => {
  let component: SlideDrawerComponent;
  let fixture: ComponentFixture<SlideDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
