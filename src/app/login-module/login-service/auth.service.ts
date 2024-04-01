import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  storeLoginStatus(status: string) {
    localStorage.setItem('status',status)
    // console.log("Auth",status)
    console.log("isloggin",this.isLoggedIn())
  }
  
  isLoggedIn():boolean {
    return !!localStorage.getItem('status')
  }

  SetLoginRole(UserRole:any){
    // console.log("UserRole-check",UserRole)
    localStorage.setItem('LoginRole', UserRole);
  }

  GetLoginRole(){
   return localStorage.getItem('LoginRole');
  }



  SetLoginData(UserData:any){
    console.log("At login",UserData)
    let userEmail = UserData.userEmail;
    let userRoleId = UserData.userRoleId;
    let loginUserId  = UserData.userId;
    let loginUserName = UserData.userName
    localStorage.setItem('LoginUserName',loginUserName);
    localStorage.setItem('LoginEmail', userEmail);
    localStorage.setItem('LoginRoleId', userRoleId);
    localStorage.setItem('loginUserId', loginUserId);
  }

  // GetLoginData(){
  //  return localStorage.getItem('LoginRole');
  // }

  clearLocalStorage() {
    localStorage.clear();
  }

 
}
