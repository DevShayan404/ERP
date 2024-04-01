import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl, } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginServiceService } from '../login-service/login-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../login-service/auth.service';


interface loginInterface {
  recDate: string;
  reportingTo: number;
  userEmail: string;
  userId: number;
  userLoginId: number;
  userName: string;
  userPassword: string;
  userRole: string;
  userRoleId: number;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });


  hide = true;
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,private AuthService:AuthService, private service:LoginServiceService, private router:Router){
    this.loginForm = this.fb.group({
      userLoginId: ['',  Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(7)])],
      userPassword: ['',  Validators.compose([Validators.required,Validators.minLength(4)])],
    })
  }

  loginObj:any;
  showLoader:boolean = false;
  login(){
    this.showLoader = true;
    // console.log("loginForm",this.loginForm)
    const Obj = this.loginForm.value;
    console.log("Login Obj",Obj);
    if (this.loginForm.valid){
      this.service.login(Obj).subscribe((res) => {
        this.loginObj = res;
        this.showLoader = false;
        const userRole = this.loginObj.userRole;
        // console.log("login res", this.loginObj, userRole)
        this.AuthService.storeLoginStatus(this.loginObj.userId);
        this.AuthService.SetLoginData(this.loginObj);
        this.setLoginRole(userRole);
        this.router.navigate(['main-page-setup']);
        this.loginForm.reset();
        this.Toast.fire({
          icon: 'success',
          title: 'login successfully',
        })
      },
      (error) => {
        if(error.status === 401) {
          this.showLoader = false;
          this.Toast.fire({
            icon: 'error',
            title: '401 unauthorized!',
          })
        }else if(error.status === 404){
          this.showLoader = false;
          this.Toast.fire({
            icon: 'error',
            title: '404 not found!',
          })
        }else if(error.status === 400){
          this.showLoader = false;
          this.Toast.fire({
            icon: 'error',
            title: '400 bad Request!',
          })
        }else{
          this.showLoader = false;
          this.Toast.fire({
            icon: 'error',
            title: 'Check username or password!',
          })
        }
      
      });
    }else{
      // this.loginForm.reset();
      this.Toast.fire({
        icon: 'error',
        title: 'please fill all fields',
      });
    }
  }


  LoginRole:any
  setLoginRole(UserRole: any) {
// console.log('setLoginRole', UserRole);
if(UserRole == "Admin"){
this.LoginRole = "Admin";
  }else if(UserRole == "Agent"){
    this.LoginRole = "Agent";
  }else if(UserRole == "Manager"){
    this.LoginRole = "Manager";
  }else if(UserRole == "Team Lead"){
    this.LoginRole = "Team Lead";
  }


  this.AuthService.SetLoginRole(this.LoginRole);
  }
}
