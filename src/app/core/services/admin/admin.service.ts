import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/app/core/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  currentUser = new BehaviorSubject(null);
  isLogin: boolean | undefined;

  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  AddVideo(formData: any) {
    return this._HttpClient.post(
      environment.endpoint + 'VidAdmin/uploadvideo',
      formData
    );
  }

  GetVideos(section: string) {
    return this._HttpClient.get(
      environment.endpoint + 'Section/GitVideo?name=' + section
    );
  }

  GetVideo(id: any) {
    return this._HttpClient.get(
      environment.endpoint + 'VidUser/GetVideo?id=' + id
    );
  }
  AddQuistion(formData: any) {
    return this._HttpClient.post(
      environment.endpoint + 'Question/SetQuestion',
      formData
    );
  }

  DeleteVideo(id: number) {
    return this._HttpClient.delete(
      environment.endpoint + 'VidAdmin/Deletevid?id=' + id
    );
  }

  AddSentence(formData: any) {
    return this._HttpClient.post(
      environment.endpoint + 'Sentence/SetSentence',
      formData
    );
  }

  getVideoSentences(id: number) {
    return this._HttpClient.get(
      environment.endpoint + 'Sentence/GetSentence?id=' + id
    );
  }
  DeleteQuestion(id: any) {
    return this._HttpClient.delete(
      environment.endpoint + 'Question/deleteQuestion?id=' + id
    );
  }

  DeleteSentence(id: any) {
    return this._HttpClient.delete(
      environment.endpoint + 'Sentence/DeleteSentence?id=' + id
    );
  }
}
