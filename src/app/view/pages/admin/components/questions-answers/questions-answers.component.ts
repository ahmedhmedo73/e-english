import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.scss'],
})
export class QuestionsAnswersComponent implements OnInit {
  heads: string[] = [
    '#',
    'Question',
    'Correct Answer',
    "User's Answer",
    'Is Correct',
    'Answer time',
  ];

  @Input('questionsAnswers') questionsAnswers: any;

  constructor() {}

  ngOnInit(): void {}
}
