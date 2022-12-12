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
import { QuestionsReportComponent } from './questions-report/questions-report.component';
import { NgChartsModule } from 'ng2-charts';
import { QuestionsReportUserComponent } from './questions-report-user/questions-report-user.component';

@NgModule({
  declarations: [
    TutorialsComponent,
    IndexComponent,
    AdminPagesComponent,
    UsersAccountsComponent,
    VideosComponent,
    QuestionsReportComponent,
    QuestionsReportUserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    SharedModule,
    NgChartsModule,
  ],
})
export class AdminModule {}
