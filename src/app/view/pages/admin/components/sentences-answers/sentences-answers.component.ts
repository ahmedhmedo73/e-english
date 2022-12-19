import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sentences-answers',
  templateUrl: './sentences-answers.component.html',
  styleUrls: ['./sentences-answers.component.scss'],
})
export class SentencesAnswersComponent implements OnInit {
  heads: string[] = [
    '#',
    'Sentence',
    "User's Answer",
    'Is Correct',
    'Answer time',
  ];

  @Input('sentencesAnswers') sentencesAnswers: any;

  constructor() {}

  ngOnInit(): void {}
}
