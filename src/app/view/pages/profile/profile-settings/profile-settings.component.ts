import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  path: string = '';
  constructor(private router: Router) {
    this.path = this.router.url;
    this.router.events.subscribe((val: any) => {
      this.path = val.url;
    });
  }

  ngOnInit(): void {}
  signOut() {
    this.router.navigate(['/login']);
  }
}
