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

  isQuestionReport: boolean = true;
  constructor(
    private questionAnswersService: QuestionAnswersService,
    private statsService: StatsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: any) => {
      this.id = data.id;
    });
    this.getQuestionAnswersReport();
  }

  getQuestionAnswersReport(): void {
    this.questionAnswersService.GetQuestionAnswersForUser(this.id).subscribe({
      next: (response: any) => {
        this.setData(response.data);
      },
    });
  }

  getSentenceAnswersReport(): void {
    
  }
  redirectToUSersPage(): void {
    this.router.navigate(['/admin/user-accounts']);
  }

  setData(data: any): void {
    this.totalAnswered = data.totalCount;
    this.totalAnsweredRight = data.rightCount;
    this.totalAnsweredWrong = data.wrongCount;
    this.questionsAnswers = data.questionsAnswers.$values;

    this.drawDonughtChart();
  }

  drawDonughtChart(): void {
    this.doughnutChartDatasets = {
      labels: ['Wrong', 'Correct'],
      datasets: [
        {
          data: [this.totalAnsweredWrong, this.totalAnsweredRight],
          backgroundColor: ['#ff6384', '#36a2eb'],
        },
      ],
    };
  }

  changeReport() {
    if (this.isQuestionReport) {
      this.getQuestionAnswersReport();
    } else {
      this.getSentenceAnswersReport();
    }
  }
}
