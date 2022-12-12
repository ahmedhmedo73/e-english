import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialsComponent } from '../admin/tutorials/tutorials.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { HomeRoutes } from './home.routes';
import { HomeComponent } from './home/home.component';
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
  declarations: [HomeComponent, CommentComponent],
  imports: [CommonModule, RouterModule.forChild(HomeRoutes), SharedModule],
})
export class HomeModule {}
