import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl, } from '@angular/forms';
import Swal from 'sweetalert2';
import { MainServiceService } from '../../../main-service/main-service.service';
import { Router } from '@angular/router';
import { SubjectServiceService } from '../../../main-service/subject-service.service';
@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.css']
})
export class UserSetupComponent implements OnInit{
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
  InserUpdate:any
  AddUserForm:any
  RecDate:any=new Date()
constructor(private mainService: MainServiceService,private fb: FormBuilder,private subjectservice:SubjectServiceService){
  this.AddUserForm = this.fb.group({
    userName: ['', Validators.required],
    userEmail: ['', Validators.required],
    userPhone: ['', Validators.required],
    userRoleId: ['', Validators.required],
    parentReportingTo:['',Validators.required],
    reportingTo:['', Validators.required],
    userLoginId: ['', Validators.required],
    userPassword: ['', Validators.required], 
  })
  this.getAllUsers();
  this.getRoledata();
  this.getManager();
}



checkRole:any
ngOnInit(): void {
  this.AddUserForm.get('userRoleId')?.valueChanges.subscribe((data: any)=>{
   this.checkRole = data;
   this.subjectservice.setCurrentRoleForStore(this.checkRole);
   })
}

AllUserData:any
AllDataLength:any
getAllUsers(){
this.mainService.GETAllUser().subscribe(res =>{
  this.AllUserData = res;
this.AllDataLength = this.AllUserData.length;
this.refreshUser(this.refreshUserID);
console.log(this.AllUserData);
});
}

showAccSetup!:boolean;
showUSerProfile!:boolean;
userId!:number
uniqueId:any
CurrentUserDetail:any;
SingleUserRole:any;
EditUserDetail(data:any){
  if(data != undefined){
    this.showUSerProfile = true;
    // this.showAccSetup = false;
    this.CurrentUserDetail = data;
console.log("Refresh User",this.CurrentUserDetail);
this.subjectservice.setCurrentUserForStore(this.CurrentUserDetail);
this.InserUpdate = 0;
this.userId = data.userId;
this.uniqueId = data.id;
this.SingleUserRole = data.userRole;

let ExistData = {
  userName:  data.userName,
  userEmail:  data.userEmail,
  userPhone:  data.userPhone,
  parentReportingTo:data.parentReportingTo,
  reportingTo:data.reportingTo,
  userRoleId:data.userRoleId,
  userLoginId: data.userLoginId,
  userPassword: data.userPassword,  
};
this.AddUserForm.patchValue(ExistData);
  }

}

RoleList:any
getRoledata(){
  this.mainService.GETRoleList().subscribe(res =>{
    this.RoleList = res;
  });
}


ManagerList:any
getManager(){
  this.mainService.GETManagerList().subscribe(res =>{
    this.ManagerList = res;
    console.log('managerlist',this.ManagerList)
    this.AddUserForm.get('parentReportingTo')?.valueChanges.subscribe((data: any)=>{
      if(data != 0){
        this.getTeamListList(data);
      }
     })
  });
}

TeamleadList:any
getTeamListList(Mid:any){
  if(Mid){
    this.mainService.GetTeamLead(Mid).subscribe(res =>{
      this.TeamleadList = res;
    console.log("teamleadList",this.TeamleadList);
    });
  }
}


Addbtn(){
  this.AddUserForm.reset();
  this.showAccSetup = true;
  this.showUSerProfile = false;
  this.InserUpdate = 1;
}

closeAccSetupCard(){
  this.AddUserForm.reset();
  this.showAccSetup = false;
}
closeUSerListCard(){
  this.showUSerProfile = false;
}
ShowAccSetupCard(){
  this.showAccSetup = true;
  
}



// roles
//admin 101
//manager 102
//team lead 103
//agent 104
UserObj:any
refreshUserID:any
AddUser(val:any){
   if(this.checkRole == 103){
    this.AddUserForm.controls['parentReportingTo'].patchValue(0);
   }
   if(this.checkRole == 102){
    this.AddUserForm.controls['parentReportingTo'].patchValue(0);
    this.AddUserForm.controls['reportingTo'].patchValue(0);
   }
   
 //update
 if(val == 0){
  this.UserObj = {
    ...this.AddUserForm.value,
    recDate: this.RecDate,
    userId:this.userId,
    id:this.uniqueId,
    userRole:"",
  }
  console.log("Update",this.UserObj);
  //add
 }else if(val == 1){
  this.UserObj = {
    ...this.AddUserForm.value,
    recDate: this.RecDate,
    userId:0,
    userRole:"",
  }
  console.log("Post",this.UserObj);
 }

if (this.AddUserForm.valid) {
  this.mainService.PostuserList(this.UserObj).subscribe((res:any) => {
    // this.ShowLead = false
    console.log('res',res);
    this.refreshUserID = res.userId;
    this.getAllUsers();
    this.getManager();
    this.Toast.fire({
      icon: 'success',
      title: 'Inserted successfully',
    });
    if(val == 1){
      this.AddUserForm.reset();
    }

  });
}else{
  this.Toast.fire({
    icon: 'error',
    title: 'please fill all fields',
  });
}
}

refreshUser(userId:any){

const FindUSer = this.AllUserData.filter((user:any) => user.userId == userId);
this.EditUserDetail(FindUSer[0]);
// console.log('Refreshing user', FindUSer);
}

toggleAero1:boolean= true;
toggleAero2:boolean= false;
toggleAero3:boolean= false;
checkAero(event:any){
  if(event == 'ToggleRequired' && this.toggleAero1 == true){
    this.toggleAero1 = false;
  }else if(event == 'ToggleRequired' && this.toggleAero1 == false){
    this.toggleAero1 = true;
  }

  if(event == 'optionalRequired' && this.toggleAero2 == true){
    this.toggleAero2 = false;
  }else if(event == 'optionalRequired' && this.toggleAero2 == false){
    this.toggleAero2 = true;
  }
  if(event == 'ProfileRequired' && this.toggleAero3 == true){
    this.toggleAero3 = false;
  }else if(event == 'ProfileRequired' && this.toggleAero3 == false){
    this.toggleAero3 = true;
  }

}
}
