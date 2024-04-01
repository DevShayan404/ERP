import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login-module/login-service/auth.service';
@Component({
  selector: 'app-main-page-setup',
  templateUrl: './main-page-setup.component.html',
  styleUrls: ['./main-page-setup.component.css']
})
export class MainPageSetupComponent {
  userRole:any;
  userName:any;
  constructor(private router: Router, private AuthService:AuthService) { 
    this.userRole = localStorage.getItem('LoginRole');
    this.userName = localStorage.getItem('LoginUserName');
    console.log("Name",this.userName)

  }
  redirectToDashboard(){
    this.router.navigate(['navbar']);
  }
  
  backToMain(){
    this.router.navigate(['main-page-setup']);
  }
  logout() {
    this.AuthService.clearLocalStorage()
    this.router.navigate(['login'])
  }
}
