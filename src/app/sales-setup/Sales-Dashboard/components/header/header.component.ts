import { AuthService } from './../../../../login-module/login-service/auth.service';
import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input()
  sidenav!: MatSidenav;
  userName:any;
  constructor(private router: Router,private AuthService:AuthService) {
    this.userName = localStorage.getItem('LoginUserName');
  }

  backToMain(){
    this.router.navigate(['main-page-setup']);
  }

  logout() {
    this.AuthService.clearLocalStorage()
    this.router.navigate(['login'])
  }
}
