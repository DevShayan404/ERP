import { Component } from '@angular/core';
import { SaleLeadService } from '../../Sales-Services/sale-lead.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormBuilder, FormGroup, Validators,FormControl, } from '@angular/forms';
import { SaleSubjectService } from '../../Sales-Services/sale-subject.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { BusinessDialogueComponent } from '../BusinessForm-dialogue/business-dialogue/business-dialogue.component';


@Component({
  selector: 'app-lead-info',
  templateUrl: './lead-info.component.html',
  styleUrls: ['./lead-info.component.css']
})
export class LeadInfoComponent {
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
  // BusinessForm = new FormControl();
  form = new FormGroup({});
  model = {};
  fields!: FormlyFieldConfig[];
  basicInfo!: FormGroup;
  leadGroupNumber:any
  loginUserId:any
  
  constructor(private service:SaleLeadService,public dialog: MatDialog,private ActivatedRoute: ActivatedRoute,private fb: FormBuilder,private saleSubjectservice:SaleSubjectService){

    this.basicInfo = this.fb.group({
      companyName: ['', Validators.required],
      personName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      expectedRevenue: ['', Validators.required],
    });

    this.ActivatedRoute.queryParams.subscribe((params:any) =>{
      this.leadGroupNumber = params.id;
      this.GetBasicinfo(this.leadGroupNumber)
    });

    const x = localStorage.getItem('loginUserId');
    this.loginUserId =  Number(x);
    this.GetBusinessList();
    
  }

  LeadInfoData:any;

GetBasicinfo(leadGroupNumber:any){
  this.service.GetBasicInfo(leadGroupNumber).subscribe((res:any)=>{
    this.LeadInfoData = res;
    console.log("LeadInfoData",this.LeadInfoData);
    this.basicInfo.patchValue(this.LeadInfoData[0]);
});
}

  TabGroup(event:any){
    this.GetBizIdFromTab(this.LeadInfoData[event.index].businessName);
}

Form:any=[]
businessName:any;
ChildBasicInfo:any;
leadGroupNo!:number
GetBizIdFromTab(BizName:any){
  this.businessName = BizName;
if(BizName){
  const FilterBusiness  = this.LeadInfoData.filter((item:any) => item.businessName === BizName);
  const FinalBusiness = FilterBusiness[0];
  this.leadGroupNo = FinalBusiness.leadGroupNumber;
  console.log("FinalBusiness",FinalBusiness,this.leadGroupNo);

this.ChildBasicInfo = {

  leadId:FinalBusiness.id,
  leadNumber:FinalBusiness.leadNumber,
  businessId:FinalBusiness.businessId,
  updatedBy:this.loginUserId,
  createdBy:this.loginUserId,
  companyName:FinalBusiness.companyName,
  email:FinalBusiness.email,
  expectedRevenue:FinalBusiness.expectedRevenue,
  mobile:FinalBusiness.mobile,
  personName:FinalBusiness.personName,
  leadMongoId:FinalBusiness.id,
  leadStatusId:FinalBusiness.statusId
}
console.log("ChildBasicInfo",this.ChildBasicInfo )

this.saleSubjectservice.setCurrentBusinessForStore(this.ChildBasicInfo);
const val = FinalBusiness.bizFormly;
this.Form = val.attributes;
this.Form = {
  fieldGroupClassName: "row",
  fieldGroup: val.attributes
};
for (let i = 0; i < this.Form.fieldGroup.length; i++) {
this.Form.fieldGroup[i].className = 'col-md-4 col-lg-3 col-sm-6 mt-2';
if(this.Form.fieldGroup[i].type != 'select'){
  // this.Form.fieldGroup[i].type = 'CustomInput';
}
if(this.Form.fieldGroup[i].type == 'select'){
  // this.Form.fieldGroup[i].props.label = '';
  this.Form.fieldGroup[i].props.placeholder = 'Select value';
}
}
this.fields  = [this.Form];
this.model = FinalBusiness.bizKeys;
}
}

BusinessList:any;
ArrayFromResponse:any;
GetBusinessList(){
this.service.getBusinessDropdown(this.loginUserId).subscribe(res=>{
  this.BusinessList = res;
  })
}

showBusinessList:boolean = false;
ShowBusinessBtn:boolean=true;
ShowBusinessList(){
this.showBusinessList = true;
}

testObject:any;
BusinessFormID:any
CheckformId:any=[]
AddBusinessNewBusiness(event:any){
  this.BusinessFormID = event;
  this.CheckformId = [];
    this.LeadInfoData.map((val: any) => {
      const formIds = val.businessId;
      this.CheckformId.push(formIds);
    });
  const CheckForm = this.CheckformId.includes(event);
    if (CheckForm == true) {
      // (event.target as HTMLButtonElement).disabled = false;
      this.Toast.fire({
        icon: 'warning',
        title: 'Business already assigned! choose another one',
      });
    }else if(CheckForm == false){
 const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mr-2",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "You want to add a new business?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Add it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
      this.Openpopup()
      } else if (
     
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "info"
        });
      }
    });
    }
}



date = new Date();
PostNewBusiness(dialogObj:any){
const createdBy = this.LeadInfoData[0].createdBy;
const createdAt = this.date;
const updatedAt = this.date;
const updatedBy = this.LeadInfoData[0].updatedBy;
const updatedLeadStatusId = 101;

  const obj = {
    leadGroupNumber: this.leadGroupNo,
    leadNumber:0,
    companyName:this.basicInfo.value.companyName,
    expectedRevenue:this.basicInfo.value.expectedRevenue,
    mobile:this.basicInfo.value.mobile,
    personName:this.basicInfo.value.personName,
    email:this.basicInfo.value.email,
    updatedLeadStatusId:updatedLeadStatusId,
    createdAt: createdAt,
    createdBy:createdBy,
    updatedBy:updatedBy, 
    updatedAt:updatedAt,
  businessId: dialogObj.businessId,
     bizKeys: dialogObj.bizKeys,
  followup: dialogObj.followup
  }

  this.service.InsertSaleLeadForm(obj).subscribe((res) => {
this.GetBasicinfo(this.leadGroupNumber);
  })

}


Openpopup(){
  var _popup =  this.dialog.open(BusinessDialogueComponent,{
width:'50%',
disableClose: true,
//  height:'400px',
//  enterAnimationDuration:'500ms',
//  exitAnimationDuration:'500ms',
data:{comp:'lead',formId:this.BusinessFormID}

   });
   _popup.afterClosed().subscribe(item=>{
    this.PostNewBusiness(item)
     console.log(item)
     //we can refresh our function here eg:this.getdata()
   })
 }


ShowRemarks:boolean = false;
ShowAttachments:boolean = false;
remaks(){
this.ShowAttachments = false;
this.ShowRemarks = true;
}

attachments(){
  this.ShowRemarks = false;
  this.ShowAttachments = true;
}
}



