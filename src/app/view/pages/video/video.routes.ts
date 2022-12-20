import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';

export const VideoRoutes: Routes = [
  {
    path: 'video/:category/:video',
    component: IndexComponent,
  },
];
