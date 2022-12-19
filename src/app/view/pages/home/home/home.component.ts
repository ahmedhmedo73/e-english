import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { environment } from 'src/app/core/environments/environment';
import { changeScore } from 'src/app/core/store/actions/score.actions';
import { AdminService } from '../../../../core/services/admin/admin.service';
import { QuizService } from '../../../../core/services/quiz/quiz.service';
import { SpeechService } from '../../../../core/services/speech/speech.service';
declare let $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
    private quizService: QuizService
  ) {
    this.speech.init();
  }

  ngOnInit(): void {
    this.getVideo(22);
  }

  getVideo(id: number): void {
    this.adminService.GetVideo(id).subscribe({
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
  checkSpeakingAnswer() {
    this.speakingAnswer = 1;
    this.setScore();
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
          next: (data) => {
            this.sentenceAnswer = this.speech.text.trim();
            this.loading = false;
          },
        });

    this.currentSentence = undefined;
  }
}
