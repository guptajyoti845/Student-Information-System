import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassComponent } from './school-class.component';

describe('SchoolClassListComponent', () => {
  let component: SchoolClassComponent;
  let fixture: ComponentFixture<SchoolClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
