import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { QuestionsService } from 'src/app/core/services/questions/questions.service';
import { SentencesService } from 'src/app/core/services/sentences/sentences.service';
import { AdminService } from '../../../../core/services/admin/admin.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
  showQuistionsModal: boolean = false;
  showAddQuistionModal: boolean = false;
  showSentencesModal: boolean = false;
  showAddSentenceModal: boolean = false;
  showAddVideoModal: boolean = false;
  videoForm!: FormGroup;
  quistionForm!: FormGroup;
  sentenceForm!: FormGroup;
  selectedVideoId!: number;
  video!: File;
  videos!: any;
  currentSectionPage!: string;
  selectedQuistionsList: any;
  sentences: any[] = [];
  questions: any;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private questionsService: QuestionsService,
    private sentencesService: SentencesService
  ) {}

  ngOnInit(): void {
    this.videoForm = this.formBuilder.group({
      name: ['', Validators.required],
      files: ['', Validators.required],
    });

    this.currentSectionPage =
      this.activatedRoute.snapshot.paramMap.get('sectionName') || '';

    this.getVideos();
  }

  getVideos() {
    this.adminService.GetVideos(this.currentSectionPage).subscribe({
      next: (data: any) => {
        this.videos = data.data.$values;
      },
    });
  }

  addVideo() {
    const formData = new FormData();
    formData.append('CategoryId', this.currentSectionPage);
    formData.append('name', this.videoForm.controls['name'].value);
    formData.append('files', this.video);

    this.adminService.AddVideo(formData).subscribe({
      next: (data) => {
        this.getVideos();
        this.showAddVideoModal = false;
      },
      error: (data) => {},
    });
  }

  addQuistion() {
    console.log(this.quistionForm.value);

    this.questionsService.Add(this.quistionForm.value).subscribe({
      next: (data) => {
        this.showAddQuistionModal = false;
        this.openQuistionsModal(this.selectedVideoId);
      },
      error: (err) => {},
    });
  }

  addSentence() {
    console.log('sad ');

    this.sentencesService.Add(this.sentenceForm.value).subscribe({
      next: (data) => {
        this.openSentencesModal(this.selectedVideoId);
      },
      error: (err) => {},
    });
  }

  handleFile(event: any) {
    this.video = event.target.files[0];
  }

  deleteVideo(id: number) {
    this.adminService.DeleteVideo(id).subscribe({
      next: (data) => {},
      error: (err) => {
        this.getVideos();
      },
    });
  }

  openSentencesModal(id: number) {
    this.showSentencesModal = true;
    this.selectedVideoId = id;

    this.sentenceForm = this.formBuilder.group({
      vid: [this.selectedVideoId],
      Sentence: ['', Validators.required],
    });

    this.sentencesService.Get(id).subscribe({
      next: (response: any) => {
        this.sentences = response.data.$values;
      },
    });
  }
  openQuistionsModal(id: any) {
    this.showQuistionsModal = true;
    this.selectedVideoId = id;
    this.questionsService.Get(id).subscribe({
      next: (data: any) => {
        this.questions = data.data.$values;
      },
    });
  }
  deleteQuestion(id: any) {
    this.questionsService.Delete(id).subscribe({
      next: (data) => {
        this.openQuistionsModal(this.selectedVideoId);
      },
      error: (err) => {},
    });
  }
  deleteSentence(id: any) {
    this.sentencesService.Delete(id).subscribe({
      next: (data) => {
        this.openSentencesModal(this.selectedVideoId);
      },
      error: (err) => {},
    });
  }

  ShowAddQuistionModal() {
    this.showAddQuistionModal = true;

    this.quistionForm = this.formBuilder.group({
      vid: [this.selectedVideoId],
      question: ['', Validators.required],
      answerData: this.formBuilder.array([
        this.formBuilder.group({
          answer: ['', Validators.required],
          isCorrectAnswer: ['', Validators.required],
        }),
        this.formBuilder.group({
          answer: ['', Validators.required],
          isCorrectAnswer: ['', Validators.required],
        }),
        this.formBuilder.group({
          answer: ['', Validators.required],
          isCorrectAnswer: ['', Validators.required],
        }),
        this.formBuilder.group({
          answer: ['', Validators.required],
          isCorrectAnswer: ['', Validators.required],
        }),
      ]),
    });
  }

  answers(): FormArray {
    return this.quistionForm.get('answerData') as FormArray;
  }
}
