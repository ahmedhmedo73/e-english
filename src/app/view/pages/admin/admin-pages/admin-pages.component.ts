import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
      name: 'QuestionsReport',
      route: '/admin/questions-report',
      icon: 'assets/icons/charts.png',
    },
  ];

  constructor(private router: Router) {
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
    this.router.navigate(['/login']);
  }
}
