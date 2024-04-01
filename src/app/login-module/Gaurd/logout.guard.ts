import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router'; 
import { AuthService
 } from '../login-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard  {
  constructor(private auth: AuthService, private router: Router) {
   
  }
  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['main-page-setup'])
    //  alert(1)
      return false;
    } else {
      // alert(2)
      return true;
    }
   
  }
  
}
