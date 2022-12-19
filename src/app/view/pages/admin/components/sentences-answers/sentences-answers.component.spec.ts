import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentencesAnswersComponent } from './sentences-answers.component';

describe('SentencesAnswersComponent', () => {
  let component: SentencesAnswersComponent;
  let fixture: ComponentFixture<SentencesAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentencesAnswersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentencesAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
