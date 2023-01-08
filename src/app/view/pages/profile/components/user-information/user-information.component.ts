import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/core/environments/environment';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
})
export class UserInformationComponent implements OnInit {
  user: any;
  mediaSrc = environment.mediaSrc;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.GetUserInfo().subscribe({
      next: (response: any) => {
        this.user = response.data;
      },
    });
  }
}
