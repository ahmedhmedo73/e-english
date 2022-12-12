import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { RouterModule } from '@angular/router';
import { ProfileRoutes } from './profile.routes';
import { StatsComponent } from './stats/stats.component';
import { RankComponent } from './rank/rank.component';
import { SharedModule } from 'src/app/core/shared/shared.module';
@NgModule({
  declarations: [
    IndexComponent,
    PersonalInformationComponent,
    PlaylistsComponent,
    ProfileSettingsComponent,
    StatsComponent,
    RankComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(ProfileRoutes), SharedModule],
})
export class ProfileModule {}
