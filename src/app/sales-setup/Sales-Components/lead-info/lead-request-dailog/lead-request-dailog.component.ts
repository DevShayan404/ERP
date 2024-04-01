import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material/material.module';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormBuilder, FormGroup, Validators,FormControl, } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { SaleSubjectService } from '../../../Sales-Services/sale-subject.service';
import { SaleLeadService } from '../../../Sales-Services/sale-lead.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { SlicePipe } from '@angular/common';
@Component({
  selector: 'app-lead-request-dailog',
  standalone: true,
  imports: [MaterialModule,FormsModule,ReactiveFormsModule,FormlyModule,SlicePipe],
  templateUrl: './lead-request-dailog.component.html',
  styleUrl: './lead-request-dailog.component.css'
})
export class LeadRequestDailogComponent {
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

  closemessage = 'this is close message';
  basicInfo!: FormGroup;
  form = new FormGroup({});
  model = {};
  fields!: FormlyFieldConfig[];
  loginUserId:any;
constructor(@Inject(MAT_DIALOG_DATA) public data:any,private saleService:SaleLeadService, private salesubject:SaleSubjectService,private fb: FormBuilder, private ref:MatDialogRef<LeadRequestDailogComponent>){
  this.basicInfo = this.fb.group({
    companyName: ['', Validators.required],
    personName: ['', Validators.required],
    email: ['', Validators.required],
    mobile: ['', Validators.required],
    // expectedRevenue: ['', Validators.required],
    address:['', Validators.required],
  });

  const x = localStorage.getItem('loginUserId');
  this.loginUserId =  Number(x);
}
 


BasicInfoFromSubject:any;
Role:any;
ticketStatus:any
ngOnInit(): void {
   this.Role =  this.data.role;

   if(this.Role == 'Agent'){
    this.salesubject.CurrentBusinessFromStore().subscribe(data => {
      this.BasicInfoFromSubject = data;
      this.basicInfo.patchValue(this.BasicInfoFromSubject);
      this.GetTicketFormly(this.BasicInfoFromSubject.businessId);
      console.log("basicInfo",this.BasicInfoFromSubject);
    })
   }

   if(this.Role == 'Coordinator'){
    this.agentRemarks = this.data.basicInfo.agentRemarks;
    this.ticketStatus = this.data.basicInfo.ticketStatus;
    this.cordinatorRemarks = this.data.basicInfo.coordinatorRemarks;
    console.log("check",this.data.basicInfo)
    this.basicInfo.patchValue(this.data.basicInfo);
    this.DublicateRecord(this.data.basicInfo);
    this.GetTicketFormly(this.data.basicInfo.businessId);
   }
  
  }


  Form:any=[]
  GetTicketFormly(BusinessId:number){
    // const BusinessId = this.BasicInfoFromSubject.BusinessId;
  this.saleService.GetbizSetupTicketFormly(BusinessId).subscribe((data:any)=>{
    console.log("Tcket Formly",data)
        this.Form = data.attributes;
this.Form = {
  fieldGroupClassName: "row",
  fieldGroup: data.attributes
};
for (let i = 0; i < this.Form.fieldGroup.length; i++) {
this.Form.fieldGroup[i].className = 'col-md-4 col-lg-3 col-sm-6 mt-2';
if(this.Form.fieldGroup[i].type != 'select'){
  this.Form.fieldGroup[i].props.required = true;
  if(this.Role == 'Coordinator'){
    this.Form.fieldGroup[i].props.disabled = true;
  }
 
}
if(this.Form.fieldGroup[i].type == 'select'){
  this.Form.fieldGroup[i].props.placeholder = 'Select value';
  this.Form.fieldGroup[i].props.required = true;
  if(this.Role == 'Coordinator'){
    this.Form.fieldGroup[i].props.disabled = true;
  }
 
}
}
this.fields  = [this.Form];
if(this.Role == 'Coordinator'){
  this.model = this.data.basicInfo.formly;
}

  })

  }

  
  closepopup(data:any){
    this.ref.close(data)
  }

  agentRemarks:any;
  CurrentDate = new Date();
  SubmitbyAgent(){

    if(this.agentRemarks){
   //First time ticket Pending status id =  105 statically without id
   const ticketObj = {
    // "id": "6569c410a7a58297c517bd92",
    "ticketStatus": 105,
    "createdAt": this.CurrentDate,
    "createdBy": this.loginUserId,
    "updatedAt": this.CurrentDate,
    "updatedBy": this.loginUserId,
    "leadNumber": this.BasicInfoFromSubject.leadNumber,
    "leadId": this.BasicInfoFromSubject.leadId,
    "businessId": this.BasicInfoFromSubject.businessId,
    "agentId": this.loginUserId,
    "coordinatorId": 0,
    "companyName": this.basicInfo.value.companyName,
    "personName": this.basicInfo.value.personName,
    "email": this.basicInfo.value.email,
    "mobile": this.basicInfo.value.mobile,
    "address": this.basicInfo.value.address,
    "agentRemarks": this.agentRemarks,
    "coordinatorRemarks": "",
    "formly": this.model,
    "businessName": "",
    "statusName": "",
    "createdByName": "",
    "coordinatorName": ""
  }

  // console.log("ticketObj",ticketObj)

  this.saleService.InsertTicketPostData(ticketObj).subscribe((res) => {
    // console.log("ticket post Res",res)
    if(res){
      const leadId =this.BasicInfoFromSubject.leadId;
      const busniessId = this.BasicInfoFromSubject.businessId;
      const status = 105;
      const remarks = this.agentRemarks;
      this.closepopup(status)
      this.saleService.updateLeadStatus(leadId,busniessId,status,remarks).subscribe((res) => {
      // console.log("update Status",res);
      });
    }

  });
    }else{
      this.Toast.fire({
        icon: 'info',
        title: 'Enter Remarks',
      })
    }
 
  }

  cordinatorRemarks:any;
  InsertByCordinator(status:any){
    const basicInfo = this.data.basicInfo;
       if(this.cordinatorRemarks){
    if(status == 'Decline' ){
      // 107 is decline
      const ticketObj = {
        "id": basicInfo.id,
        "ticketStatus": 107,
        "createdAt": this.CurrentDate,
        "createdBy": this.loginUserId,
        "updatedAt": this.CurrentDate,
        "updatedBy": this.loginUserId,
        "leadNumber": basicInfo.leadNumber,
        "leadId": basicInfo.leadId,
        "businessId": basicInfo.businessId,
        "agentId": basicInfo.agentId,
        "coordinatorId": this.loginUserId,
        "companyName": basicInfo.companyName,
        "personName": basicInfo.personName,
        "email": basicInfo.email,
        "mobile": basicInfo.mobile,
        "address": basicInfo.address,
        "agentRemarks": basicInfo.agentRemarks,
        "coordinatorRemarks": this.cordinatorRemarks,
        "formly": basicInfo.formly,
        "businessName": "",
        "statusName": "",
        "createdByName": "",
        "coordinatorName": ""
      }
      console.log("Final Object",ticketObj)
      
        this.saleService.InsertTicketPostData(ticketObj).subscribe((res:any) => {
          console.log("ticket post Res",res)
          this.closepopup('cordinator');
          if(res){
            const leadId = res.leadId;
            const busniessId = res.businessId;
            const status = res.ticketStatus;
            const remarks = res.coordinatorRemarks;
    
            console.log(leadId,busniessId,status,remarks);
            this.saleService.updateLeadStatus(leadId,busniessId,status,remarks).subscribe((res) => {
            console.log("update Status",res);
            });
          }
    
        });
   

    }else if(status == 'Approve'){
      // 106 is approved
      const ticketObj = {
        "id": basicInfo.id,
        "ticketStatus": 106,
        "createdAt": this.CurrentDate,
        "createdBy": this.loginUserId,
        "updatedAt": this.CurrentDate,
        "updatedBy": this.loginUserId,
        "leadNumber": basicInfo.leadNumber,
        "leadId": basicInfo.leadId,
        "businessId": basicInfo.businessId,
        "agentId": basicInfo.agentId,
        "coordinatorId": this.loginUserId,
        "companyName": basicInfo.companyName,
        "personName": basicInfo.personName,
        "email": basicInfo.email,
        "mobile": basicInfo.mobile,
        "address": basicInfo.address,
        "agentRemarks": basicInfo.agentRemarks,
        "coordinatorRemarks": this.cordinatorRemarks,
        "formly": basicInfo.formly,
        "businessName": "",
        "statusName": "",
        "createdByName": "",
        "coordinatorName": "",
        "proposalId":"0"
      }
      // console.log("Final Object",ticketObj)
      this.saleService.InsertTicketPostData(ticketObj).subscribe((res:any) => {
        // console.log("ticket post Res",res)
        this.closepopup('cordinator');
        if(res){
          const leadId = res.leadId;
          const busniessId = res.businessId;
          const status = res.ticketStatus;
          const remarks = res.coordinatorRemarks;

          console.log(leadId,busniessId,status,remarks)
  
          this.saleService.updateLeadStatus(leadId,busniessId,status,remarks).subscribe((res) => {
          // console.log("update Status",res);
          });
        }
  
      });
    }

  }else{
    this.Toast.fire({
      icon: 'info',
      title: 'Enter Remarks',
    })
  }

  }


  readonlyFields(){
    if(this.Role == 'Agent'){
      return false;
    }else if(this.Role == 'Coordinator'){
      return true;
    }
    return false;
  }


  DublicateTicketList:any
  DublicateRecord(obj:any){
    console.log('DublicateRecord', obj);
   
    this.saleService.InsertDuplicateTicket(obj).subscribe((res)=>{
      this.DublicateTicketList = res;
      console.log(res)
    })
  }

  getPromoStyles(status: any) {
    if (status == 'Ticket Pending') {
      return {
        background: '#FFFFE3',
        color: '#8F8F00',
      
      };
    }
    if (status == 'Ticket Approved') {
      return {
        background: '#E8FFE9',
        color: '#00A308',
       
      };
    }
    if (status == 'Ticket Declined') {
      return {
        background: '#FFE7E7',
        color: '#FF4747',
        
      };
    }
    return {
      background: '#000000',
      color: 'white',
    };
  }
}
