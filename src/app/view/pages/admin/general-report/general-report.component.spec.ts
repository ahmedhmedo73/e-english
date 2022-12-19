import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsReportComponent } from './questions-report.component';

describe('QuestionsReportComponent', () => {
  let component: QuestionsReportComponent;
  let fixture: ComponentFixture<QuestionsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
