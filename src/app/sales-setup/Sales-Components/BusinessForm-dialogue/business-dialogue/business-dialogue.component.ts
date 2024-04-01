import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators,FormControl, } from '@angular/forms';
import Swal from 'sweetalert2';
import {FormlyFieldConfig} from '@ngx-formly/core';
import { SaleLeadService } from '../../../Sales-Services/sale-lead.service';
@Component({
  selector: 'app-business-dialogue',
  templateUrl: './business-dialogue.component.html',
  styleUrl: './business-dialogue.component.css'
})
export class BusinessDialogueComponent {
  form = new FormGroup({});
  model = { };
  fields!: FormlyFieldConfig[];
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private ref:MatDialogRef<BusinessDialogueComponent>,private fb: FormBuilder,private leadService:SaleLeadService){}
  InputData:any;
  closemessage = 'this is close message';

  Form:any=[];
  businessName:any;
  businessId:any
  ngOnInit(): void {
    this.InputData = this.data;
    const Bid = this.InputData.formId;

if(Bid){
  this.leadService.GetFormlyForm(Bid).subscribe((val:any)=>{
    console.log(val);
this.fields = [];
this.Form = val.attributes;
this.businessName = val.formlyName;
this.businessId = val.businessId;
// console.log("form",val);
this.Form = {
  fieldGroupClassName: "row",
  fieldGroup: val.attributes
};
for (let i = 0; i < this.Form.fieldGroup.length; i++) {
this.Form.fieldGroup[i].className = 'col-md-6 col-lg-6 col-sm-6 mt-2';
if(this.Form.fieldGroup[i].type != 'select'){
  // this.Form.fieldGroup[i].type = 'CustomInput';
  this.Form.fieldGroup[i].props.require = true;
}
if(this.Form.fieldGroup[i].type == 'select'){
  // this.Form.fieldGroup[i].props.label = '';
  this.Form.fieldGroup[i].props.placeholder = 'Select value';
  this.Form.fieldGroup[i].props.require = true;
}
}
this.fields  = [this.Form];
  });
}
  }

  currentDate = new Date();
  getBizzModel(model:any){

if(this.InputData.comp == 'lead'){
  const bizLeadObj = {
    businessId:this.businessId,
    bizKeys:model,
    followup:{
        "leadStatusId" : 101,
        "followupDate" : this.currentDate,
        "remark" : "",
        "isLatest" : true
    }
  } 
  this.closepopup(bizLeadObj);
}else if(this.InputData.comp == 'sale'){
const bizsaleObj = {
  businessName:this.businessName,
  businessId:this.businessId,
  bizKeys:model,
  followup:{
    "leadStatusId" : 101,
    "followupDate" : this.currentDate,
    "remark" : "",
    "isLatest" : true
}
} 
this.closepopup(bizsaleObj);
  }
}

  closepopup(model:any){
    this.ref.close(model)
  }
}
