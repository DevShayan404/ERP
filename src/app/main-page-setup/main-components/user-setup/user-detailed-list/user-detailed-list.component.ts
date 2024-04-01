import { Component } from '@angular/core';

import { MainServiceService } from '../../../main-service/main-service.service';
import { SubjectServiceService } from '../../../main-service/subject-service.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-user-detailed-list',
  templateUrl: './user-detailed-list.component.html',
  styleUrls: ['./user-detailed-list.component.css'],
})
export class UserDetailedListComponent {

user = {
  "managers": [
    {
      "name": "Sarfaraz",
      "teamleads": [
        {
          "name": "Shuja haider",
          "agents": [
            "Agent 1",
            "Agent 2",
            "Agent 3",
            "Agent 4",
            "Agent 5"
          ]
        },
        {
          "name": "Mohammad",
          "agents": [
            "Agent 6",
            "Agent 7",
            "Agent 8",
            "Agent 9",
            "Agent 10"
          ]
        },
        {
          "name": "Noman",
          "agents": [
            "Agent 11",
            "Agent 12",
            "Agent 13",
            "Agent 14",
            "Agent 15"
          ]
        }
      ]
    }
  ]
}


deatialList:any=[];
LogoUrl:any= 'http://172.16.1.226:3600/';
constructor(private service:MainServiceService, private subjectService:SubjectServiceService){
  // this.deatialList =  this.user.managers[0]
  this.currentUser();
}
CurrentUser:any;
UserName:any;
UserEmail:any;
UserPhone:any;
UserRole:any;
UserRoleID:any
UserManager:any;
UserTeamLead:any
currentUser(){
  this.subjectService.CurrentUserFromStore().subscribe(val => {
    this.CurrentUser = val;
    // console.log("current user",this.CurrentUser);
    this.UserName = this.CurrentUser.userName;
    this.UserEmail = this.CurrentUser.userEmail;
    this.UserPhone = this.CurrentUser.userPhone;
    this.UserRole = this.CurrentUser.userRole;
  this.UserRoleID = this.CurrentUser.userRoleId;
    this.getAllBusiness(this.UserEmail,this.UserRoleID);
    if(this.UserRole == 'Team Lead'){
this.UserManager = this.CurrentUser.reportingToName;
    }
    if(this.UserRole == 'Agent'){
      this.UserManager = this.CurrentUser.parentReportingToName;
      this.UserTeamLead = this.CurrentUser.reportingToName;
          }
    this.GetAllHerarichys();
    // console.log('user detailed com',this.CurrentUser)
  })
}

GetAllHerarichys() {
  let userId = this.CurrentUser?.userId;
this.service.GetUSerDetailedList(userId).subscribe(res => {
  // console.log("detail tree",res);
  this.deatialList = [];
  if(this.CurrentUser.userRole == 'Manager'){
    this.deatialList = res;
    this.deatialList = this.deatialList.subordinates
    // console.log('user manager',this.deatialList)
  }else if(this.CurrentUser.userRole == 'Team Lead'){
    this.deatialList = [res];
    // console.log('Team lead',this.deatialList)
  }
})
}

AllBusiness:any
   getAllBusiness(email:any,role:any){
    this.AllBusiness = [];
    this.service.GetAllBusiness(email,role).subscribe(res =>{
      this.AllBusiness = res;
      this.AllBusiness = this.AllBusiness.assignedBusiness;
      console.log("List comp",this.AllBusiness)
    })
   }



   closeUSerListCard(){
    // this.showAccSetup = false;
  }

public hideShowDropdown: boolean[] = [];
toggleDropdown(index: any) {  
    if( this.hideShowDropdown[index] == undefined){
      this.hideShowDropdown[index] = false;
      
    }
    else{
      this.hideShowDropdown[index] =
      !this.hideShowDropdown[index];
    }
}

handleImageError(item:any){
  item.logoUrl = '/assets/errorbusiness.png'
}

}
