import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { TabsService } from './core/services/tabs/tabs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAdmin: boolean = false;
  isLogin: boolean = false;
  hideSideBar: boolean = false;

  constructor(
    private authService: AuthService,
    private tabsService: TabsService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe({
      next: (data: any) => {
        if (data) {
          this.isAdmin = data.roles == 'Admin';
          this.isLogin = true;
        } else {
          this.isAdmin = false;
          this.isLogin = false;
        }
      },
    });

    this.tabsService.hideSideBar.subscribe({
      next: (data) => {
        this.hideSideBar = data;
      },
    });
  }
}
