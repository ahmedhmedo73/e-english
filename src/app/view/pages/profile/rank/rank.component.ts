import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss'],
})
export class RankComponent implements OnInit {
  ranks: any = [
    {
      rank: 125,
      user: 'user-5',
      score: 557,
    },
    {
      rank: 126,
      user: 'user-6',
      score: 452,
    },
    {
      rank: 127,
      user: 'user-7',
      score: 401,
    },
    {
      rank: 128,
      user: 'user-8',
      score: 321,
    },
    {
      rank: 129,
      user: 'user-9',
      score: 302,
    },
    {
      rank: 130,
      user: 'user-10',
      score: 259,
    },
    {
      rank: 131,
      user: 'user-11',
      score: 210,
    },
  ];
  user : string = "user-8";
  constructor() {}

  ngOnInit(): void {}
}
