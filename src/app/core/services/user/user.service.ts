import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  GetUserInfo() {
    return this.httpClient.get(environment.endpoint + 'Manage/GetUserInfo');
  }

  EditProfile(formData: any) {
    return this.httpClient.post(
      environment.endpoint + 'Manage/EditProfile',
      formData
    );
  }

  ChangePassword(data: any) {
    return this.httpClient.post(
      environment.endpoint + 'Manage/ChangePassword',
      data
    );
  }
}
