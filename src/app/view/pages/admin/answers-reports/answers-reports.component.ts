import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AnswersReportsService } from 'src/app/core/services/answers-reports/answers-reports.service';
import { StatsService } from 'src/app/core/services/states/states.service';
import { UsersAccountsService } from 'src/app/core/services/users-accounts/users-accounts.service';

@Component({
  selector: 'app-answers-reports',
  templateUrl: './answers-reports.component.html',
  styleUrls: ['./answers-reports.component.scss'],
})
export class AnswersReportsComponent implements OnInit {
  answers: any[] = [];

  totalAnswered!: number;
  totalAnsweredRight!: number;
  totalAnsweredWrong!: number;

  id: any;

  isQuestionReport: boolean = true;
  isAnswersPage: boolean = false;
  user: any;
  constructor(
    private answersReportsService: AnswersReportsService,
    private usersAccountsService: UsersAccountsService,
    private statsService: StatsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: any) => {
      this.id = data.id;
      if (data.isQuetions) {
        this.isQuestionReport = Boolean(data.isQuetions);
      }
    });
    this.isAnswersPage = this.router.url.includes('answers-report');
    if (this.isAnswersPage) {
      if (this.isQuestionReport) {
        this.GetQuestionAnswersReport();
      } else {
      }
    } else {
      this.getQuestionAnswersReportForUser();
      this.getUserDetails();
    }
  }

  getQuestionAnswersReportForUser(): void {
    this.answersReportsService
      .GetQuestionAnswersReportForUser(this.id)
      .subscribe({
        next: (response: any) => {
          this.answers = response.data.questionsAnswers.$values;
          this.setData(response.data);
        },
      });
  }

  GetQuestionAnswersReport(): void {
    this.answersReportsService.GetQuestionAnswersReport().subscribe({
      next: (response: any) => {
        this.answers = response.data.questionsAnswers.$values;
        this.setData(response.data);
      },
    });
  }

  getSentenceAnswersReport(): void {
    this.answersReportsService
      .GetSentenceAnswersReportForUser(this.id)
      .subscribe({
        next: (response: any) => {
          this.answers = response.data.sentenceAnswers.$values;
          this.setData(response.data);
        },
      });
  }
  redirectToUSersPage(): void {
    this.router.navigate(['/admin/user-accounts']);
  }

  setData(data: any): void {
    this.totalAnswered = data.totalCount;
    this.totalAnsweredRight = data.rightCount;
    this.totalAnsweredWrong = data.wrongCount;
  }

  changeReport() {
    this.answers = [];
    if (this.isAnswersPage) {
      if (this.isQuestionReport) {
        this.getQuestionAnswersReport();
      } else {
        this.getSentenceAnswersReport();
      }
    } else {
      if (this.isQuestionReport) {
        this.getQuestionAnswersReportForUser();
      } else {
        this.getSentenceAnswersReportForUser();
      }
    }
  }

  getSentenceAnswersReportForUser() {
    this.answersReportsService
      .GetSentenceAnswersReportForUser(this.id)
      .subscribe({
        next: (response: any) => {
          this.answers = response.data.sentenceAnswers.$values;
          this.setData(response.data);
        },
      });
  }
  getQuestionAnswersReport() {}

  getUserDetails(): void {
    this.usersAccountsService.GetUser(this.id).subscribe({
      next: (response: any) => {
        this.user = response.data;
      },
    });
  }
}
