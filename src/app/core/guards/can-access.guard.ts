import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanAccessGuard implements CanActivate {
  user: any;
  constructor(private router: Router) {
    this.user = jwtDecode(localStorage['token']);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(this.user, 'user');

    if (localStorage['token'] && this.user.roles == 'Admin') {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
