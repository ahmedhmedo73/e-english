import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';
import { TabsService } from './core/services/tabs/tabs.service';

import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAdmin: boolean = false;
  isLoginPage: boolean = false;
  hideSideBar: boolean = false;

  constructor(
    private authService: AuthService,
    private tabsService: TabsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    AOS.init();

    this.router.events.subscribe({
      next: (data) => {
        if (data instanceof NavigationEnd) {
          if (data.url == '/login' || data.url == '/register') {
            this.isLoginPage = true;
          } else {
            this.isLoginPage = false;
          }
        }
      },
    });

    this.authService.currentUser.subscribe({
      next: (data: any) => {
        if (data) {
          this.isAdmin = data.roles == 'Admin';
        } else {
          this.isAdmin = false;
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
