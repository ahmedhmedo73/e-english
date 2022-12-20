import { getScore } from './../../../core/store/selectors/score.selector';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ScoreService } from 'src/app/core/services/score/score.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  score: number = 0;
  showPlaymode: boolean = false;
  isLogin: boolean | undefined;
  QuestionAnswersCountRight: number = 0;
  QuestionAnswersCountMistake: number = 0;
  userName: any;
  constructor(
    private store: Store<{ score: number }>,
    private _AuthService: AuthService,
    private router: Router,
    private scoreService: ScoreService
  ) {
    this.store
      .pipe(select(getScore()))
      .subscribe((data) => (this.score = data));
    this._AuthService.currentUser.subscribe(() => {
      if (this._AuthService.currentUser.getValue() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });

    this.router.events.subscribe((data) => {
      if (data instanceof NavigationStart) {
        this.showPlaymode = false;
      }
    });
  }

  ngOnInit(): void {
    this.getScore();
    this._AuthService.currentUser.subscribe({
      next: (data: any) => {
        this.userName = data.sub;
      },
    });
  }

  getScore(): void {
    forkJoin({
      QuestionAnswersCountMistake:
        this.scoreService.GetQuestionAnswersCountMistake(),
      QuestionAnswersCountRight:
        this.scoreService.GetQuestionAnswersCountRight(),
    }).subscribe({
      next: (response: any) => {
        this.QuestionAnswersCountRight =
          response['QuestionAnswersCountRight'].data;
        this.QuestionAnswersCountMistake =
          response['QuestionAnswersCountMistake'].data;

        this.score =
          this.QuestionAnswersCountRight * 5 - this.QuestionAnswersCountMistake;
        this.score = this.score > 0 ? this.score : 0;
      },
    });
  }

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
    this._AuthService.logout();
  }
}
