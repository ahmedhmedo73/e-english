import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { RankComponent } from './rank/rank.component';
import { StatsComponent } from './stats/stats.component';

export const ProfileRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: '', redirectTo: 'personal-information', pathMatch: 'full' },
      { path: 'personal-information', component: PersonalInformationComponent },
      { path: 'playlists', component: PlaylistsComponent },
      { path: 'stats', component: StatsComponent },
      { path: 'rank', component: RankComponent },
    ],
  },
];
