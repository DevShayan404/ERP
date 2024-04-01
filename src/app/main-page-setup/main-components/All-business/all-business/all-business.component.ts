import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../../login-module/login-service/auth.service';
import { MainServiceService } from '../../../main-service/main-service.service';
@Component({
  selector: 'app-all-business',
  templateUrl: './all-business.component.html',
  styleUrls: ['./all-business.component.css']
})
export class AllBusinessComponent {
  dataSubscription: Subscription | undefined;
  userRole:any;
  constructor(private router: Router,private auth: AuthService,private mainService: MainServiceService) {

    this.userRole = localStorage.getItem('LoginRole');

    let email =  localStorage.getItem('LoginEmail');
    let role =  localStorage.getItem('LoginRoleId');
// console.log("email or id",email,role);
    // this.getAllBusiness(email,role);
    this.getAllStages();
   }


  AllTickets:any
  AllStages:any=[]
  getAllStages(){
    this.mainService.GetAllStages().subscribe(res =>{
      this.AllStages = res;
      // this.AllStages.push({bizStageName:'Tickets',logoUrl:'https://cdn.iconscout.com/icon/free/png-512/free-health-records-1901778-1607977.png?f=webp&w=512'})
      this.AllStages.splice(1, 0, {bizStageName:'Tickets',logoUrl:'https://cdn.iconscout.com/icon/free/png-512/free-health-records-1901778-1607977.png?f=webp&w=512'});
// console.log('all stages',res);
    })
    this.mainService.GetAllTickets().subscribe((tickets:any) =>{
      this.AllTickets = tickets;
      // console.log("check details",tickets);
    })
  }

  redirectToDashboard(item:any){
    // console.log('redirect to dashboard',item);
    if(item.bizStageName == 'Tickets'){
      this.router.navigate(['/main-page-setup/alltickets']);
    }else{
  this.router.navigate(['navbar']);
    }
  
  }
}
