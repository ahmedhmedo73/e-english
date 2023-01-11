import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AdminService } from '../admin/admin.service';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  tabs = new BehaviorSubject([]);

  isVideoPage = new BehaviorSubject<boolean>(false);
  isLastLesson = new BehaviorSubject<boolean>(false);
  hideSideBar = new BehaviorSubject<boolean>(false);

  url: string[] = [];
  currentCategoryName: string = '';
  currentVideoName: string = '';
  currentVideoIndex: number = 0;

  defaultTabs: any = [
    {
      title: 'Classroom',
      route: '/home',
    },
    {
      title: 'Profile',
      route: '/profile/personal-information',
    },
  ];
  nextVideoName: string = '';

  constructor(private router: Router, private adminService: AdminService) {
    this.router.events.subscribe({
      next: (data) => {
        if (data instanceof NavigationEnd) {
          this.url = data.url.split('/');

          if (
            this.url[1] == 'home' ||
            this.url[1] == 'profile' ||
            this.url[1] == 'video'
          ) {
            this.hideSideBar.next(false);
            this.isVideoPage.next(this.url[1] == 'video');
            if (this.url[1] == 'video') {
              this.currentCategoryName = decodeURI(this.url[2]);
              this.currentVideoName = decodeURI(this.url[3]);

              this.adminService
                .GetVideosByCategoryName(this.currentCategoryName)
                .subscribe({
                  next: (response: any) => {
                    let videos: any = response.data;
                    if (videos) {
                      this.tabs.next(
                        videos.map((data: any, index: number) => {
                          if (this.currentVideoName == data.name) {
                            this.currentVideoIndex = index;
                            if (this.currentVideoIndex == videos.length - 1) {
                              this.isLastLesson.next(true);
                            } else {
                              this.isLastLesson.next(false);
                            }
                          }
                          if (this.currentVideoIndex == index - 1) {
                            this.nextVideoName = data.name;
                          }
                          return {
                            title: data.name,
                            route:
                              '/video/' +
                              this.currentCategoryName +
                              '/' +
                              data.name,
                          };
                        })
                      );
                    }
                  },
                });
            } else {
              this.tabs.next(this.defaultTabs);
            }
          } else {
            this.hideSideBar.next(true);
          }
        }
      },
    });
  }
}
