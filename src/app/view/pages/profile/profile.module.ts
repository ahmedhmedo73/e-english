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
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserInformationComponent } from './components/user-information/user-information.component';
@NgModule({
  declarations: [
    IndexComponent,
    PersonalInformationComponent,
    PlaylistsComponent,
    ProfileSettingsComponent,
    StatsComponent,
    RankComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    UserInformationComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(ProfileRoutes), SharedModule],
})
export class ProfileModule {}
