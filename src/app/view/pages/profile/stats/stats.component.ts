import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../../../core/services/states/states.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  answeredQuestionsTotal!: number;
  answeredQuestionsCorrect!: number;
  answeredQuestionsWrong!: number;
  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.statsService.GetQuestionAnswersCount(2).subscribe({
      next: (data: any) => {
        this.answeredQuestionsTotal = data;
      },
    });
    this.statsService.GetQuestionAnswersCountMistake(2).subscribe({
      next: (data: any) => {
        this.answeredQuestionsWrong = data;
      },
    });
    this.statsService.GetQuestionAnswersCountRight(2).subscribe({
      next: (data: any) => {
        this.answeredQuestionsCorrect = data;
      },
    });
  }
}
