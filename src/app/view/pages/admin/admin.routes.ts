import { TutorialsComponent } from './tutorials/tutorials.component';
import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { UsersAccountsComponent } from './users-accounts/users-accounts.component';
import { VideosComponent } from './videos/videos.component';
import { GeneralReportComponent } from './general-report/general-report.component';
import { AnswersReportsComponent } from './answers-reports/answers-reports.component';

export const AdminRoutes: Routes = [
  {
    path: 'admin',
    component: IndexComponent,
    children: [
      { path: 'tutorials', component: TutorialsComponent },
      { path: 'user-accounts', component: UsersAccountsComponent },
      {
        path: 'user-report/:id',
        component: AnswersReportsComponent,
      },
      {
        path: 'answers-report/:id/:isQuetions',
        component: AnswersReportsComponent,
      },
      {
        path: 'general-report',
        component: GeneralReportComponent,
      },
      { path: 'video/:sectionName', component: VideosComponent },
    ],
  },
];
