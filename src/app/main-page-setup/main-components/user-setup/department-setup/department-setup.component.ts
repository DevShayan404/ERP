import { Component ,Input, OnInit,EventEmitter, Output} from '@angular/core';

import { MainServiceService } from '../../../main-service/main-service.service';
import { SubjectServiceService } from '../../../main-service/subject-service.service';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-department-setup',
  templateUrl: './department-setup.component.html',
  styleUrls: ['./department-setup.component.css']
})

export class DepartmentSetupComponent implements OnInit {
  // @Input() CurrentRole: any
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
BusienssList:any
CurrentData:any
constructor(private service:MainServiceService, private subjectService:SubjectServiceService){
this.service.GETBusienssList().subscribe(res=>{
  this.BusienssList = res;
  this.currentUser();
})
}

finalFilter:any
newObj:any
UserRole:any
currentUser(){
  this.subjectService.CurrentUserFromStore().subscribe(val => {
    this.newObj = {}
    console.log("Current", val);
    this.CurrentData = val;
    this.UserRole = this.CurrentData.userRole;
  
    const Existbusiness = this.CurrentData.assignedBusiness;
    this.finalFilter = this.BusienssList.filter((x:any) => Existbusiness.some((y:any) => y.businessId === x.businessId));
    this.finalFilter.map((val:any)=>{
      this.newObj[val.business] = true;
  })
  this.selectedBusinesses = this.newObj;

  })
}

  selectedBusinesses: { [key: string]: boolean } = {};
  selectAll: boolean = false;
  selectAllChanged() {
    for (const business of this.BusienssList) {
      this.selectedBusinesses[business.business] = this.selectAll;
    }
  }

  businessChanged(business: string) {

    if (!this.selectedBusinesses[business]) {
      this.selectAll = false;
    } else {
      const allSelected = this.BusienssList.every((b:any) => this.selectedBusinesses[b]);
      this.selectAll = allSelected;
    }
  }

  getSelectedValues() {
    const selectedValues = [];
    for (const business of this.BusienssList) {
      if (this.selectedBusinesses[business.business]) {
        const obj = {
          businessId: business.businessId
        }
        selectedValues.push(obj);
      }
    }
    return selectedValues;
  }

  RecDate:any=new Date()
  bizListObj:any
  getVal(){
   const checkedBusiness = this.getSelectedValues();

   if(this.CurrentData.userBizId == ""){
    this.bizListObj = {
      // id:  this.CurrentData.userBizId,
      agentId:  this.CurrentData.userId,
      email:  this.CurrentData.userEmail,
      createdAt: this.RecDate,
      updatedAt:this.RecDate,
      assignedBusiness: checkedBusiness
  }
  
   }else{
    this.bizListObj = {
      id:  this.CurrentData.userBizId,
      agentId:  this.CurrentData.userId,
      email:  this.CurrentData.userEmail,
      createdAt: this.RecDate,
      updatedAt:this.RecDate,
      assignedBusiness: checkedBusiness
  }
   }
   
console.log("business obj",this.bizListObj)

   this.service.PostCheckboxBusiness(this.bizListObj).subscribe(data => {
    this.notifyParent.emit(0);
  })
  }

  AddUserForm:any
CurrentRole:any
  ngOnInit() { 
    // CurrentRoleFromStore
    this.subjectService.CurrentRoleFromStore().subscribe(val => {
      this.CurrentRole = val;
console.log("Role From Form USerCompoem",val)
    })
  }


 
}

