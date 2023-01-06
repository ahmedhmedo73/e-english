import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin.routes';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { IndexComponent } from './index/index.component';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { UsersAccountsComponent } from './users-accounts/users-accounts.component';
import { VideosComponent } from './videos/videos.component';
import { NgChartsModule } from 'ng2-charts';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { AnswersReportsComponent } from './answers-reports/answers-reports.component';
import { GeneralReportComponent } from './general-report/general-report.component';
import { QuestionsAnswersComponent } from './components/questions-answers/questions-answers.component';
import { SentencesAnswersComponent } from './components/sentences-answers/sentences-answers.component';
import { UserCardComponent } from './components/user-card/user-card.component';

@NgModule({
  declarations: [
    TutorialsComponent,
    IndexComponent,
    AdminPagesComponent,
    UsersAccountsComponent,
    VideosComponent,
    AnswersReportsComponent,
    GeneralReportComponent,
    DoughnutChartComponent,
    QuestionsAnswersComponent,
    SentencesAnswersComponent,
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    SharedModule,
    NgChartsModule,
  ],
})
export class AdminModule {}
