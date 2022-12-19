import { Component, OnInit } from '@angular/core';
import { AnswersReportsService } from 'src/app/core/services/answers-reports/answers-reports.service';

@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrls: ['./general-report.component.scss'],
})
export class GeneralReportComponent implements OnInit {
  reports: any[] = [];

  heads: string[] = [
    '#',
    'Id',
    'Question',
    'Correct Answer',
    "User's Answer",
    'Is Correct',
    'Answer time',
  ];

  constructor(private answersReportsService: AnswersReportsService) {}

  ngOnInit(): void {
    this.answersReportsService.GetGeneralReport().subscribe({
      next: (response: any) => {
        this.reports = response.data;
      },
    });
  }

  getReport(): void {}
}
