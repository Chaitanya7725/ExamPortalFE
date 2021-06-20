import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizOperationsComponent } from './quiz-operations.component';

describe('QuizOperationsComponent', () => {
  let component: QuizOperationsComponent;
  let fixture: ComponentFixture<QuizOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
