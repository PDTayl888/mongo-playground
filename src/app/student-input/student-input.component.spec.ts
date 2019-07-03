import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInputComponent } from './student-input.component';

describe('StudentInputComponent', () => {
  let component: StudentInputComponent;
  let fixture: ComponentFixture<StudentInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
