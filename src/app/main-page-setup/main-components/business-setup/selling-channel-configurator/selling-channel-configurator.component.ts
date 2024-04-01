import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl, } from '@angular/forms';
import { MainServiceService } from '../../../main-service/main-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-selling-channel-configurator',
  templateUrl: './selling-channel-configurator.component.html',
  styleUrl: './selling-channel-configurator.component.css'
})
export class SellingChannelConfiguratorComponent {
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

  @ViewChild('inputFile') myInputVariable!: ElementRef;
  SellingChannelForm!: FormGroup;
  loginUserId:any;
  LogoUrl:any= 'http://172.16.1.226:3600/';
  constructor(private fb: FormBuilder,private mainService:MainServiceService){
    this.GetBusiness();
    const x = localStorage.getItem('loginUserId');
    this.loginUserId =  Number(x);
    this.SellingChannelForm = this.fb.group({
      channelName: ['', Validators.required],
      channelLogo: ['', Validators.required],  
      smtpServer: ['', Validators.required],
      smtpPort:['', Validators.required],
      emailId: ['', Validators.compose([Validators.required,Validators.email])],
      emailPassword: ['', Validators.required],
    });
  }

  refreshBusiness(){
    this.GetBusiness();
  }

  BusinessList:any=[]
  GetBusiness(){
    this.mainService.GETBusinessName().subscribe((res:any)=>{
      this.BusinessList = res;
      console.log("All business",res);
    })
  }


  BizId:any;
  BizName:any;
  onChangeBusiness(Biz:any){
this.BizId = Biz.value.businessId;
this.BizName = Biz.value.business;
this.GetSellingChannelAllRecord(this.BizId);
this.SellingChannelForm.reset();
this.myInputVariable.nativeElement.value = '';
  }


  AllSellingRecord:any
  GetSellingChannelAllRecord(BizId:number){
    this.mainService.GetbizSetupChannelFormly(BizId).subscribe((res:any)=>{
      this.AllSellingRecord = res;
      if(this.AllSellingRecord?.length == 0){
        this.Toast.fire({
          icon: 'info',
          title: `no data`,
        }) 
      }
console.log("GetSelingchanelAllRecord",this.AllSellingRecord);
    });
  }



FileByApi:any;
CurrentDate:any = new Date();
AddForm(form:any){
const fileData = form.value.channelLogo[0];
const formData = new FormData();
formData.append('file', fileData);


// console.log("Form Data",formData)

this.mainService.uploadFile(formData).subscribe((res) => {
  this.FileByApi = res;
  this.FileByApi = this.FileByApi.file;
  const SellingObj = {
    createdAt: this.CurrentDate,
    createdBy: this.loginUserId,
    updatedAt: this.CurrentDate,
    updatedBy: this.loginUserId,
    businessId: this.BizId,
    channelName: form.value.channelName,
    channelLogo:this.FileByApi,  
    smtpServer: form.value.smtpServer,
    smtpPort:form.value.smtpPort,
    emailId:form.value.emailId,
    emailPassword:form.value.emailPassword ,
   };

     console.log("finalObj", SellingObj);
     this.PostSellingchannel(SellingObj);

});
  }

  SellingRes:any
  PostSellingchannel(SellingObj:any){
if(this.SellingChannelForm.valid){
  this.mainService.PostbizSetupChannelFormly(SellingObj).subscribe((res)=>{
    this.SellingRes = res;
    this.SellingRes = this.SellingRes.channelName
    console.log("Fresponse",res);
    if(res){
      this.GetSellingChannelAllRecord(this.BizId);
      this.Toast.fire({
        icon: 'success',
        title: `Successfully added ${this.SellingRes}`,
      }) 
      this.SellingChannelForm.reset();
      this.myInputVariable.nativeElement.value = '';
    }
   
  })
}else{
  this.Toast.fire({
    icon: 'info',
    title: "Fill all fields",
  }) 
}
 }


 deleteResponse:any
 removeItem(rowId:any){
  console.log("removeItem",rowId)
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
//Api
this.mainService.deletesellingData(rowId).subscribe((res)=>{
  this.deleteResponse = res;
  this.deleteResponse = this.deleteResponse.value.channelName;
  console.log(res);
  if(res){
    this.GetSellingChannelAllRecord(this.BizId);
    this.Toast.fire({
      icon: 'success',
      title: `${this.deleteResponse} deleted successfully`,
    }) 
  }
})
      }
    }); 
}


 
 
}
