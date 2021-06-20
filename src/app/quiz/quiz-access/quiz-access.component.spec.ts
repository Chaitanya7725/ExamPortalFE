import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizAccessComponent } from './quiz-access.component';

describe('QuizAccessComponent', () => {
  let component: QuizAccessComponent;
  let fixture: ComponentFixture<QuizAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
