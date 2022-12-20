import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MessageService } from 'primeng/api';
import { environment } from 'src/app/core/environments/environment';
import { changeScore } from 'src/app/core/store/actions/score.actions';
import { AdminService } from '../../../../core/services/admin/admin.service';
import { QuizService } from '../../../../core/services/quiz/quiz.service';
import { SpeechService } from '../../../../core/services/speech/speech.service';
declare let $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  played: boolean = false;
  showQuestion: boolean = false;
  speakingAnswer: number = -1;
  mcqAnswer: number = -1;
  score: number = 0;
  video: any;
  questions: any;
  sentences: any;
  URL: string = environment.videoPath;
  text: any;
  sentenceISCorrect!: boolean;
  sentencesAnswer: any[] = [];
  currentSentence: any;
  loading: boolean = false;

  isCorrect: boolean[] = [];
  isAnswered: number[] = [];
  sentenceAnswer: string = '';
  setenceAnswred: boolean = false;

  constructor(
    private store: Store,
    private adminService: AdminService,
    public speech: SpeechService,
    private notification: NzNotificationService,
    private quizService: QuizService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.speech.init();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (data: any) => {
        this.getVideo({ videoName: data.video, CategoryName: data.category });
      },
    });
  }

  getVideo(data: any): void {
    this.adminService.GetVideo(data).subscribe({
      next: (response: any) => {
        this.video = response.data;
        this.questions = response.data.questions.$values;
        this.sentences = response.data.spokenSentences.$values;

        const formData = new FormData();
        formData.append('IdVideo', this.video.id);
        formData.append('IdUser', '2');
        this.quizService.addView(formData).subscribe({
          next: (data) => {},
          error: (data) => {},
        });
      },
    });
  }

  startVideo(status: string) {
    $('video').get(0).play();
    $(status).fadeOut('slow');
    setTimeout(() => {
      if (!this.played) {
        this.played = true;
      }
      $('.retry').fadeIn('slow');
    }, $('video').get(0).duration * 1000);
  }

  checkMcqAnswer(
    idQue: number,
    answerId: number,
    qIndex: number,
    sIndex: number
  ) {
    this.quizService
      .answerQuestion({
        idQue,
        answerId,
      })
      .subscribe({
        next: (response: any) => {
          this.isCorrect[qIndex] = response.data.isCorrectAnswer;
          this.isAnswered[qIndex] = sIndex;
          if (response.data.isCorrectAnswer) {
            this.messageService.add({
              severity: 'success',
              summary: 'Question',
              detail: 'Correct Answer',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Question',
              detail: 'Wrong Answer',
            });
          }
        },
        error: (error) => {},
      });
    this.setScore();
  }
  setScore() {
    if (this.mcqAnswer == 1 && this.speakingAnswer == 1) this.score = 10;
    else if (this.mcqAnswer == 1) this.score = 5;
    else if (this.speakingAnswer == 1) this.score = 5;
    else if (this.mcqAnswer == 0 && this.speakingAnswer == 0) this.score = -10;
    else this.score == 0;
    $('.score').css('opacity', 1);
    setTimeout(() => {
      $('.score').css('opacity', 0);
    }, 1000);
    if (this.mcqAnswer == 1 && this.speakingAnswer == 1) this.score = 5;
    if (this.mcqAnswer) this.store.dispatch(changeScore({ score: this.score }));
  }

  startService(): void {
    this.speech.text = '';
    this.speech.start();
    this.loading = true;

    this.setenceAnswred;

    setTimeout(() => {
      this.stop();
    }, 2000);
  }

  stop(): void {
    this.speech.stop();

    if (this.speech.text)
      this.quizService
        .answerSentence({
          videoId: 22,
          sentenceUserAnswer: this.speech.text.trim(),
        })
        .subscribe({
          next: (response: any) => {
            this.sentenceAnswer = this.speech.text.trim();
            this.loading = false;
            if (response.data.isCorrectAnswer) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sentence',
                detail: 'right',
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Sentence',
                detail: 'wrong',
              });
            }
          },
        });

    this.currentSentence = undefined;
  }
}
