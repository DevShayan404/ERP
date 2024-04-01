import {  ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router'; 
import { AuthService
 } from '../login-service/auth.service';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  userRole:any;
  constructor(private auth: AuthService, private router: Router) {
    // this.userRole = localStorage.getItem('LoginRole');
 
  }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // if (this.auth.isLoggedIn()) {
    //   return true;
    // } else {
    //   this.router.navigate(['login'])
    //   return false;
    // }
    this.userRole = this.auth.GetLoginRole();
    // console.log("check auth user role",this.userRole);
    if (this.userRole != null ){
      var userAllowed = route.data['roles'].includes(this.userRole);
      // console.log("userAllowed",userAllowed , this.userRole);
      if (userAllowed) {
        // console.log("Auth",this.userRole);
        return true;
      }
      else {
        // console.log(userAllowed);
        return false;
      }
    }
    else {
      // console.log(this.userRole);
      this.router.navigate(['login']);
      return false;
    }  

  }
}

