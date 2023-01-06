import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { environment } from 'src/app/core/environments/environment';
import { changeScore } from 'src/app/core/store/actions/score.actions';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { QuizService } from 'src/app/core/services/quiz/quiz.service';
import { SpeechService } from 'src/app/core/services/speech/speech.service';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
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
  questions: any[] = [];
  sentences: any[] = [];
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
  isVideoPlaying: boolean = false;

  currentTab: number = 0;
  tabsLength: number = 0;
  progressBar: number = 100;
  nextPage: boolean = false;
  answerId: any;
  sIndex: any;
  sentenceAnswerIsCorrect: boolean = false;
  micStatus: boolean = false;
  islastLesson: boolean = false;
  nextVideoName: string = '';
  categoryName: string = '';

  constructor(
    private store: Store,
    private adminService: AdminService,
    public speech: SpeechService,
    private quizService: QuizService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private tabsService: TabsService,
    private router: Router
  ) {
    this.speech.init();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (data: any) => {
        this.categoryName = data.category;
        this.getVideo({ videoName: data.video, CategoryName: data.category });
      },
    });

    this.tabsService.isLastLesson.subscribe({
      next: (data) => {
        // console.log(data, 'last');

        this.islastLesson = data;
      },
    });
  }

  getVideo(data: any): void {
    this.adminService.GetVideo(data).subscribe({
      next: (response: any) => {
        this.video = response.data;
        this.questions = response.data.questions.$values;
        this.tabsLength = this.questions.length + 1;
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
    this.isVideoPlaying = true;
    $(status).fadeOut('slow');
    setTimeout(() => {
      if (!this.played) {
        this.played = true;
      }
      $('.retry').fadeIn('slow');
      this.isVideoPlaying = false;
    }, $('video').get(0).duration * 1000);
  }

  checkMcqAnswer(idQue: number, qIndex: number) {
    this.quizService
      .answerQuestion({
        idQue,
        answerId: this.answerId,
      })
      .subscribe({
        next: (response: any) => {
          this.isCorrect[qIndex] = response.data.isCorrectAnswer;
          this.isAnswered[qIndex] = this.sIndex;

          console.log(this.isCorrect, 'this.isCorrect');
          console.log(this.isAnswered, 'this.isAnswered');

          this.sIndex = undefined;
          this.answerId = undefined;
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

    this.micStatus = true;
  }

  stop(): void {
    this.micStatus = false;

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
              this.sentenceAnswerIsCorrect = true;
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

  nextTab(): void {
    if (this.currentTab < this.tabsLength - 1) {
      this.currentTab++;
    }
  }

  selectAnswer(answerId: number, sIndex: number) {
    this.answerId = answerId;
    this.sIndex = sIndex;
  }

  nextLesson(): void {
    let route = '';
    if (this.islastLesson) {
      route = '/home';
    } else {
      route = `/video/${this.categoryName}/${this.tabsService.nextVideoName}`;
    }
    this.router.navigate([route]);
  }
}
