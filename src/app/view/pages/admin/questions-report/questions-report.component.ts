import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionAnswersService } from 'src/app/core/services/questions-report/questions-report.service';
import * as moment from 'moment';
import { ChartConfiguration } from 'chart.js';
import { StatsService } from 'src/app/core/services/states/states.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-questions-report',
  templateUrl: './questions-report.component.html',
  styleUrls: ['./questions-report.component.scss'],
})
export class QuestionsReportComponent implements OnInit {
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Wrong', 'Correct'],
    datasets: [{ data: [2, 7] }],
  };

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

  form!: FormGroup;
  questionsAnswers: any[] = [];
  moment: any = moment;
  heads: string[] = [
    '#',
    'Id',
    'Question',
    'Correct Answer',
    "User's Answer",
    'Is Correct',
    'Answer time',
  ];

  totalAnswered!: number;
  totalAnsweredRight!: number;
  totalAnsweredWrong!: number;

  constructor(
    private formBuilder: FormBuilder,
    private questionAnswersService: QuestionAnswersService,
    private statsService: StatsService
  ) {}

  ngOnInit(): void {
    this.createform();
    // this.getReport();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      id: [2, Validators.required],
    });
  }

  getReport(): void {
    let id = this.form.get('id')?.value;
    this.questionAnswersService
      .GetQuestionAnswersForUser(this.form.get('id')?.value)
      .subscribe({
        next: (data: any) => {
          this.questionsAnswers = data.$values;
          this.questionsAnswers = this.questionsAnswers.filter(
            (data: Object) => {
              return 'id' in data;
            }
          );
        },
      });

    forkJoin({
      total: this.statsService.GetQuestionAnswersCount(id),
      right: this.statsService.GetQuestionAnswersCountRight(id),
      wrong: this.statsService.GetQuestionAnswersCountMistake(id),
    }).subscribe((data: any) => {
      this.totalAnswered = data['total'];
      this.totalAnsweredRight = data['right'];
      this.totalAnsweredWrong = data['wrong'];

      this.doughnutChartDatasets = {
        labels: ['Wrong', 'Correct'],
        datasets: [
          {
            data: [this.totalAnsweredWrong, this.totalAnsweredRight],
            backgroundColor: ['#ff6384', '#36a2eb'],
          },
        ],
      };
    });
  }
}
