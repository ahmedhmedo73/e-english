import { getScore } from './../../../core/store/selectors/score.selector';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  score: number = 0;
  showPlaymode: boolean = false;
  isLogin: boolean | undefined;
  constructor(
    private store: Store<{ score: number }>,
    private _AuthService: AuthService,
    private router: Router
  ) {
    this.store
      .pipe(select(getScore()))
      .subscribe((data) => (this.score = data));
    this._AuthService.currentUser.subscribe(() => {
      if (this._AuthService.currentUser.getValue() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = true;
      }
    });

    this.router.events.subscribe((data) => {
      if (data instanceof NavigationStart) {
        this.showPlaymode = false;
      }
    });
  }

  ngOnInit(): void {}
  stylePlayMode() {
    if (this.showPlaymode)
      return {
        opacity: '1',
        transform: 'translate3d(0, 0, 0)',
      };
    return {
      opacity: '0',
      'z-index': '-1',
      transform: 'translate3d(-10%, 0, 0)',
    };
  }
  signOut() {
    this.router.navigate(['/login']);
  }
}
