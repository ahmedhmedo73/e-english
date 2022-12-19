import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsReportUserComponent } from './questions-report-user.component';

describe('QuestionsReportUserComponent', () => {
  let component: QuestionsReportUserComponent;
  let fixture: ComponentFixture<QuestionsReportUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsReportUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsReportUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
