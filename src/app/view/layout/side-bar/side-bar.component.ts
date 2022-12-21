import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  tabs: any;

  defaultTabs: any = [
    {
      title: 'Classroom',
      route: '/home',
    },
    {
      title: 'Profile',
      route: '/profile',
    },
  ];

  route: string = '';
  isVideoPage: boolean = false;
  currentCategoryName: string = '';
  currentVideoName: string = '';
  url: string[] = [];

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe({
      next: (data) => {
        if (data instanceof NavigationEnd) {
          this.url = data.url.split('/');
          this.route = data.url;
          this.isVideoPage = this.url[1] == 'video';
          if (this.isVideoPage) {
            this.currentCategoryName = this.url[2];
            this.currentVideoName = this.url[3];

            this.adminService
              .GetVideosByCategoryName(this.currentCategoryName)
              .subscribe({
                next: (response: any) => {
                  this.tabs = response.data.$values.map((data: any) => {
                    return {
                      title: data.name,
                      route:
                        '/video/' + this.currentCategoryName + '/' + data.name,
                    };
                  });
                },
              });
          } else {
            this.tabs = this.defaultTabs;
          }
        }
      },
    });
  }

  signOut() {
    this.authService.logout();
  }
}
