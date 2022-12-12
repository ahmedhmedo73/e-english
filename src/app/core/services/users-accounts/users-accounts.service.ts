import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/core/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersAccountsService {
  constructor(private HttpClient: HttpClient) {}

  GetUsers() {
    return this.HttpClient.get(environment.endpoint + 'User/GetAllUsers');
  }
  DeleteUser(id: string) {
    return this.HttpClient.delete(environment.endpoint + 'User/DeleteUesr', {
      params: { id },
    });
  }
}
