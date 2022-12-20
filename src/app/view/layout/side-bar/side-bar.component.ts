import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  tabs: any = [
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
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe({
      next: (data) => {
        if (data instanceof NavigationEnd) {
          this.route = data.url;
        }
      },
    });
  }

  signOut() {
    this.authService.logout();
  }
}
