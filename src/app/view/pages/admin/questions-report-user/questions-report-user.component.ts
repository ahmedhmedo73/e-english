import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { QuestionAnswersService } from 'src/app/core/services/questions-report/questions-report.service';
import { StatsService } from 'src/app/core/services/states/states.service';

@Component({
  selector: 'app-questions-report-user',
  templateUrl: './questions-report-user.component.html',
  styleUrls: ['./questions-report-user.component.scss'],
})
export class QuestionsReportUserComponent implements OnInit {
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Wrong', 'Correct'],
    datasets: [{ data: [2, 7] }],
  };

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

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

  id: any;
  constructor(
    private formBuilder: FormBuilder,
    private questionAnswersService: QuestionAnswersService,
    private statsService: StatsService,
    private activatedRoute: ActivatedRoute,
    private router : Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: any) => {
      this.id = data.id;
    });
    this.getReport();
  }

  getReport(): void {
    this.questionAnswersService.GetQuestionAnswersForUser(this.id).subscribe({
      next: (data: any) => {
        this.questionsAnswers = data.$values;
        this.questionsAnswers = this.questionsAnswers.filter((data: Object) => {
          return 'id' in data;
        });
      },
    });

    forkJoin({
      total: this.statsService.GetQuestionAnswersCount(this.id),
      right: this.statsService.GetQuestionAnswersCountRight(this.id),
      wrong: this.statsService.GetQuestionAnswersCountMistake(this.id),
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
  redirectToUSersPage(): void {
    this.router.navigate(['/admin/user-accounts']);
  }
}
