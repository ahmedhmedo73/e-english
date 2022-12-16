import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAdmin: boolean = false;
  isLogin: boolean = false;
  constructor(private authService: AuthService) {}

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
  }
}
