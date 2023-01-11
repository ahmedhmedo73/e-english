import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  tabs: any;

  route: string = '';
  isVideoPage: boolean = false;
  currentCategoryName: string = '';
  currentVideoName: string = '';
  url: string[] = [];

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router,
    private tabsService: TabsService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe({
      next: (data) => {
        if (data instanceof NavigationEnd) {
          this.url = data.url.split('/');
          this.route = decodeURI(data.url);
          console.log(this.route);

          this.isVideoPage = this.url[1] == 'video';
          if (this.isVideoPage) {
            this.currentCategoryName = decodeURI(this.url[2]);
            this.currentVideoName = decodeURI(this.url[3]);
          }
        }
      },
    });

    this.tabsService.tabs.subscribe({
      next: (data) => {
        this.tabs = data;
        console.log(this.tabs);
      },
    });
  }

  signOut() {
    this.authService.logout();
  }
}
