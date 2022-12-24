import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PageLink } from '../../../../core/models/admin-pages';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.scss'],
})
export class AdminPagesComponent implements OnInit {
  path: string = '';
  isVideoPage: boolean = false;
  pageLinks: PageLink[] = [
    {
      name: 'Content',
      route: '/admin/tutorials',
      icon: 'assets/icons/playlist.png',
    },
    {
      name: 'Users',
      route: '/admin/user-accounts',
      icon: 'assets/icons/person.png',
    },
    {
      name: 'General Report',
      route: '/admin/general-report',
      icon: 'assets/icons/charts.png',
    },
  ];

  constructor(private router: Router, private authService: AuthService) {
    this.path = this.router.url;
    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        this.path = val.url;
        this.isVideoPage = this.path.includes('video');
      }
    });
  }
  ngOnInit(): void {}
  signOut() {
    this.authService.logout();
  }
}
