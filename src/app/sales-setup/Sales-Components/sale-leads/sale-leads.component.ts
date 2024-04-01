import { Component, OnInit } from '@angular/core';
import {FormArray, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators,FormControl, } from '@angular/forms';
import { SaleLeadService } from '../../Sales-Services/sale-lead.service';
import { MatDialog } from '@angular/material/dialog';
import { BusinessDialogueComponent } from '../BusinessForm-dialogue/business-dialogue/business-dialogue.component';
import Swal from 'sweetalert2';
import {FormlyFieldConfig} from '@ngx-formly/core';

@Component({
  selector: 'app-sale-leads',
  templateUrl: './sale-leads.component.html',
  styleUrls: ['./sale-leads.component.css'],

})
export class SaleLeadsComponent implements OnInit{
  form = new FormGroup({});
  model = { };
  fields!: FormlyFieldConfig[];


  status = [
    {statusId:1,
    status:'pendings'},
    {statusId:1,
      status:'close'},
      {statusId:1,
        status:'done'},
  ]

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
  value = '';
  leadForm!: FormGroup;
  ShowLead!: boolean;
  
loginUserId:any
  constructor(private fb: FormBuilder,public dialog: MatDialog,private leadService:SaleLeadService){

    this.leadForm = this.fb.group({
      companyName: ['', Validators.required],
      personName: ['', Validators.required],
      mobile: ['', Validators.required],
      email :['', Validators.compose([Validators.required, Validators.email]) ],
      expectedRevenue: ['', Validators.required],
      businessId:[''],
      // 'followups':new FormArray([
      //   this.fb.group({
      //   'leadStatusId': new FormControl(''),
      //   'followupDate': new FormControl<Date | null>(null),
      //   'remarks': new FormControl(''),
      //   'isLatest': new FormControl(true)
      // })
      // ])
      
    });

const x = localStorage.getItem('loginUserId');
    this.loginUserId =  Number(x);
    this.ShowLead = false;
    this.GetLead();
    this.GetBusinessList();
    this.GetStatusList();
  }

  get FrmArr() {
    return this.leadForm.controls['followups'] as FormArray;
  }

  BusinessId:any
  ngOnInit(): void {
    this.leadForm.get('businessId')?.valueChanges.subscribe((data: any)=>{
      this.BusinessId = data;
      if(this.BusinessId){
        this.Openpopup(this.BusinessId);
      }   
      })
  }

  bizKeysFrmDialog:any
  Openpopup(bizId:any){
    var _popup =  this.dialog.open(BusinessDialogueComponent,{
  width:'50%',
  disableClose: true,
  //  height:'400px',
  //  enterAnimationDuration:'500ms',
  //  exitAnimationDuration:'500ms',
  data:{comp:'sale',formId:bizId}
  
     });
     _popup.afterClosed().subscribe(item=>{
       this.bizKeysFrmDialog = item;
     })
   }

  leadData:any = []
  GetLead(){
    this.leadService.GETSaleLeadForm(this.loginUserId).subscribe(res=>{
          this.leadData = res;
          this.ShowLead = false;
        })
  }

BusinessList:any;
  GetBusinessList(){
    this.leadService.getBusinessDropdown(this.loginUserId).subscribe(res=>{
this.BusinessList = res;
    })
  }


  StatusList:any;
  GetStatusList(){
    this.leadService.getStatusDropdown().subscribe(res=>{
      this.StatusList = res;
    });
  }


  Currentdate = new Date();
  AddLead(){
    const updatedLeadStatusId = 101;
    const obj = {
      leadGroupNumber: 0,
      leadNumber:0,
      companyName:this.leadForm.value.companyName,
      expectedRevenue:this.leadForm.value.expectedRevenue,
      mobile:this.leadForm.value.mobile,
      personName:this.leadForm.value.personName,
      email:this.leadForm.value.email,
      updatedLeadStatusId:updatedLeadStatusId,
      createdAt: this.Currentdate,
      createdBy:this.loginUserId,
      updatedBy:this.loginUserId, 
      updatedAt:this.Currentdate, 
      businessId: this.BusinessId,
      bizKeys: this.bizKeysFrmDialog.bizKeys,
      followup:this.bizKeysFrmDialog.followup
    }
    console.log("Sale New lead",obj)
    if (this.leadForm.valid) {
      this.leadService.InsertSaleLeadForm(obj).subscribe((res) => {
        this.ShowLead = false
        this.GetLead();
        this.Toast.fire({
          icon: 'success',
          title: 'Inserted successfully',
        });
      
    this.leadForm.reset();
        console.log("Lead res", res)
      });
    }else{
      this.Toast.fire({
        icon: 'error',
        title: 'please fill all fields',
      });
    }
  }

  ShowNewLead(){
    this.ShowLead = true;
  }

 
}
