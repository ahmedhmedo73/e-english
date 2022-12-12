import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuizService } from '../../../../../core/services/quiz/quiz.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input('video_id') video_id!: number;
  @Input('comments') comments: any;
  @Output() getVideo = new EventEmitter<number>();

  form!: FormGroup;

  constructor(
    private quizService: QuizService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      idUser: [2],
      strcoment: [null, Validators.required],
    });
  }

  comment(): void {
    if (this.form.valid) {
      this.quizService
        .addComment({ idVid: this.video_id, ...this.form.value })
        .subscribe({
          next: (data: any) => {},
          error: (err) => {
            this.getVideo.emit(6);
          },
        });
    }
  }

  deleteComment(id: number): void {
    this.quizService.deleteomment(id).subscribe({
      next: (data) => {},
      error: (error) => {
        this.getVideo.emit(6);
      },
    });
  }
}
