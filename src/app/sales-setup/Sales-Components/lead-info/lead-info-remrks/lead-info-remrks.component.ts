import { Component ,Input, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { remarksModel } from '../../../Sales-models/remarksModel';
import { ActivatedRoute } from '@angular/router';
import { SaleLeadService } from '../../../Sales-Services/sale-lead.service';
import { SaleSubjectService } from '../../../Sales-Services/sale-subject.service';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';
import { LeadRequestDailogComponent } from '../lead-request-dailog/lead-request-dailog.component';
@Component({
  selector: 'app-lead-info-remrks',
  templateUrl: './lead-info-remrks.component.html',
  styleUrls: ['./lead-info-remrks.component.css']
})
export class LeadInfoRemrksComponent implements OnInit{
  Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  receivedData:any;
  date = new Date();
  form = this.fb.group({
  html:  ['', Validators.required],
});
  constructor(public dialog: MatDialog,private fb: FormBuilder,private ActivatedRoute: ActivatedRoute,private leadService:SaleLeadService,private salesubject:SaleSubjectService){
    this.showRemarks = this.AllRemarks;

  this. GetStatusList();
  // this.GetAllRemarks();
  }

  basicInfo:any;
  leadStatusId:any;
  ngOnInit(): void { 
    this.salesubject.CurrentBusinessFromStore().subscribe(data => {
      this.basicInfo = data;
      this.leadStatusId = this.basicInfo.leadStatusId;
      console.log("Lead status ID",this.leadStatusId)
      this.GetAllRemarks(this.basicInfo);
    })
  }


  AllRemarks:any;
  GetAllRemarks(basicInfo:any){
    const leadId =  basicInfo.leadId;
    const businessId = basicInfo.businessId;
this.leadService.GetAllRemarks(leadId,businessId).subscribe(data =>{
  this.AllRemarks = data;
  console.log("allRemarks",data);
  this.showRemarks = data;
  this.showRemarks.sort((a:any, b:any) => {
    return this.showRemarks.indexOf(b) - this.showRemarks.indexOf(a);
  });
})
  }

  StatusList:any;
  GetStatusList(){
    this.leadService.getStatusDropdown().subscribe(res=>{
      this.StatusList = res;
      let newRow = { leadStatusId: 999, leadStatus: 'All Remarks' };
      this.StatusList = [newRow , ...this.StatusList];
    });
  }


  TabGroup(event:any){
    console.log(event);
    this.GetBizIdFromTab(this.StatusList[event.index].leadStatus);
}

showRemarks:any
GetBizIdFromTab(status:any){
if(status === 'All Remarks'){
  this.showRemarks = this.AllRemarks;
}else{
  this.showRemarks  = this.AllRemarks.filter((item:any) => item.leadStatus === status);
}
}

RemarksStatusId!:number
OnChangeRemarks(StatusID:number){
  this.RemarksStatusId = StatusID;
}

RemarkResponse:any
sendRemark(){
  const obj = {
  leadId: this.basicInfo.leadId,
  leadNumber:this.basicInfo.leadNumber,
  businessId:this.basicInfo.businessId,
  createdAt: this.date, 
  createdBy: this.basicInfo.createdBy,
  updatedAt:this.date,
  updatedBy: this.basicInfo.updatedBy,
  followupDate:this.date,
  remark: this.form.value.html!,
  leadStatusId: this.RemarksStatusId,
  isLatest: true,
  }
  console.log("obj",obj);

  if(this.form.valid){
    this.leadService.InsertLeadRemarks(obj).subscribe(data=>{
      console.log("data",data);
      this.GetAllRemarks(this.basicInfo);
      this.RemarkResponse = data;
      this.RemarkResponse = this.RemarkResponse.remark;
      this.leadStatusId = this.RemarksStatusId;
      
      this.Toast.fire({
        icon: 'success',
        title: `${this.RemarkResponse} added successfully`,
      }) 
      this.form.reset();
    })
  }else{
    this.Toast.fire({
      icon: 'info',
      title: `Enter remarks`,
    }) 
  }

 
}


Openpopup(){
  var _popup =  this.dialog.open(LeadRequestDailogComponent,{
width:'100%',
disableClose: true,
data:{title:'Sales Ticket For Approval (Agent)',role:'Agent'}

   });
   _popup.afterClosed().subscribe(item=>{
     console.log("from agent",item)
     if(item == 105){
      this.leadStatusId = item;
     }
     //we can refresh our function here eg:this.getdata()
   })
 }
}
