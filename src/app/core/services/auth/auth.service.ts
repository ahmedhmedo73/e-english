import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { environment } from 'src/app/core/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject(null);
  isLogin: boolean | undefined;

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (
      localStorage.getItem('token') &&
      localStorage.getItem('token') != null
    ) {
      this.saveCurrentUser();
    }
  }
  saveCurrentUser() {
    let token: any = localStorage.getItem('token');
    this.currentUser.next(jwtDecode(token));
  }
  register(formData: any): Observable<any> {
    return this._HttpClient.post(
      environment.endpoint + 'Auth/Register',
      formData
    );
  }
  login(data: any): Observable<any> {
    return this._HttpClient.post(environment.endpoint + 'Auth/login', data);
  }
  logout() {
    this.currentUser.next(null);
    localStorage.removeItem('token');
    this._Router.navigate(['/']);
  }

  getToken() {
    return localStorage['token'];
  }
}
