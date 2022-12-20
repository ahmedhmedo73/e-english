import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { RouterModule } from '@angular/router';
import { VideoRoutes } from './video.routes';
import { CommentComponent } from './components/comment/comment.component';
import { SharedModule } from 'src/app/core/shared/shared.module';

@NgModule({
  declarations: [IndexComponent, CommentComponent],
  imports: [CommonModule, RouterModule.forChild(VideoRoutes), SharedModule],
})
export class VideoModule {}
