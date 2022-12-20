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

  GetVideos(categoryId: string) {
    return this._HttpClient.get(environment.endpoint + 'Section/GitVideo', {
      params: { categoryId },
    });
  }

  GetVideo(data: any) {
    return this._HttpClient.get(environment.endpoint + 'VidUser/GetVideo', {
      params: data,
    });
  }

  DeleteVideo(id: number) {
    return this._HttpClient.delete(
      environment.endpoint + 'VidAdmin/Deletevid?id=' + id
    );
  }
}
