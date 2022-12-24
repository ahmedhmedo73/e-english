import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { AnswersReportsService } from 'src/app/core/services/answers-reports/answers-reports.service';
import { GeneralReport } from 'src/app/core/services/answers-reports/reports.interface';

@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrls: ['./general-report.component.scss'],
})
export class GeneralReportComponent implements OnInit {
  public LineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: false,
  };

  public LineChartDatasets: ChartConfiguration<'line'>['data'] = {
    labels: ['Wrong', 'Correct'],
    datasets: [
      {
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgb(75, 192, 192)',
        pointBackgroundColor: 'blue',
        pointRadius: 7,
        pointBorderWidth: 1,
      },
    ],
  };
  chartLabels: string[] = [];
  chartData: number[] = [];

  reports!: GeneralReport;

  heads: string[] = [
    '#',
    'Id',
    'Question',
    'Correct Answer',
    "User's Answer",
    'Is Correct',
    'Answer time',
  ];
  totalCategories: number = 0;
  totalVideos: number = 0;
  totalQuestions: number = 0;
  totalUsers: number = 0;

  rightQuestionsAnswers: any[] = [];
  rightSentenceAnswers: any[] = [];
  wrongQuestionsAnswers: any[] = [];
  wrongSentenceAnswers: any[] = [];

  constructor(private answersReportsService: AnswersReportsService) {}

  ngOnInit(): void {
    this.getReport();
  }

  getReport(): void {
    let datePipe = new DatePipe('en-us');
    this.answersReportsService.GetGeneralReport().subscribe({
      next: (response: any) => {
        this.reports = response.data;
        this.rightQuestionsAnswers = this.reports.rightQuestionsAnswers.$values;
        this.rightSentenceAnswers = this.reports.rightSentenceAnswers.$values;
        this.wrongQuestionsAnswers = this.reports.wrongQuestionsAnswers.$values;
        this.wrongSentenceAnswers = this.reports.wrongSentenceAnswers.$values;
        this.reports.registerUserCountPerDay.$values.forEach((data: any) => {
          this.chartLabels.push(
            datePipe.transform(data.day, 'dd-MM-yyyy') || ''
          );
          this.chartData.push(data.count);
        });

        this.LineChartDatasets.labels = this.chartLabels;
        this.LineChartDatasets.datasets[0].data = this.chartData;
      },
    });
  }
}
