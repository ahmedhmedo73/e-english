import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  sentences: any;
  questions: any;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.videoForm = this.formBuilder.group({
      name: ['', Validators.required],
      files: ['', Validators.required],
    });

    this.quistionForm = this.formBuilder.group({
      Question: ['', Validators.required],
      Answer1: ['', Validators.required],
      Answer4: ['', Validators.required],
      Answer2: ['', Validators.required],
      Answer3: ['', Validators.required],
      CorrectAnswer: ['', Validators.required],
    });

    this.sentenceForm = this.formBuilder.group({
      Sentence: ['', Validators.required],
    });

    this.currentSectionPage =
      this.activatedRoute.snapshot.paramMap.get('sectionName') || '';
    this.getVideos();
  }

  getVideos() {
    this.adminService.GetVideos(this.currentSectionPage).subscribe({
      next: (data: any) => {
        this.videos = data.$values;
      },
    });
  }

  addVideo() {
    const formData = new FormData();
    formData.append('section', this.currentSectionPage);
    formData.append('name', this.videoForm.controls['name'].value);
    formData.append('files', this.video);

    this.adminService.AddVideo(formData).subscribe({
      next: (data) => {},
      error: (data) => {
        this.getVideos();
        this.showAddVideoModal = false;
      },
    });
  }

  addQuistion() {
    const formData = new FormData();
    formData.append('Question', this.quistionForm.controls['Question'].value);
    formData.append('Answer1', this.quistionForm.controls['Answer1'].value);
    formData.append('Answer2', this.quistionForm.controls['Answer2'].value);
    formData.append('Answer3', this.quistionForm.controls['Answer3'].value);
    formData.append('Answer4', this.quistionForm.controls['Answer4'].value);
    formData.append(
      'CorrectAnswer',
      this.quistionForm.controls['CorrectAnswer'].value
    );
    formData.append('Vid', this.selectedVideoId.toString());

    this.adminService.AddQuistion(formData).subscribe({
      next: (data) => {},
      error: (err) => {
        this.showAddQuistionModal = false;
        this.openQuistionsModal(this.selectedVideoId);
      },
    });
  }

  addSentence() {
    const formData = new FormData();
    formData.append('Sentence', this.sentenceForm.controls['Sentence'].value);
    formData.append('Vid', this.selectedVideoId.toString());

    this.adminService.AddSentence(formData).subscribe({
      next: (data) => {},
      error: (err) => {
        this.showAddSentenceModal = false;
        this.openSentencesModal(this.selectedVideoId);
      },
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
    this.adminService.GetVideo(id).subscribe({
      next: (data: any) => {
        this.sentences = data.spokenSentences.$values;
      },
    });
  }
  openQuistionsModal(id: any) {
    this.showQuistionsModal = true;
    this.selectedVideoId = id;
    this.adminService.GetVideo(id).subscribe({
      next: (data: any) => {
        this.questions = data.questions.$values;
      },
    });
  }
  deleteQuestion(id: any) {
    this.adminService.DeleteQuestion(id).subscribe({
      next: (data) => {},
      error: (err) => {
        this.openQuistionsModal(this.selectedVideoId)
      },
    });
  }
  deleteSentence(id: any) {
    this.adminService.DeleteSentence(id).subscribe({
      next: (data) => {},
      error: (err) => {
        this.openSentencesModal(this.selectedVideoId)
      },
    });
  }
}
