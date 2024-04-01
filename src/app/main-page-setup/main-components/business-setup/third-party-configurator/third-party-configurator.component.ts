import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl, } from '@angular/forms';
import { MainServiceService } from '../../../main-service/main-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-third-party-configurator',
  templateUrl: './third-party-configurator.component.html',
  styleUrl: './third-party-configurator.component.css'
})
export class ThirdPartyConfiguratorComponent {
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
  thirdPartyForm!: FormGroup;
  loginUserId:any;
LogoUrl:any= 'http://172.16.1.226:3600/'
  constructor(private fb: FormBuilder,private mainService:MainServiceService){
    this.GetBusiness();
    const x = localStorage.getItem('loginUserId');
    this.loginUserId =  Number(x);
    this.thirdPartyForm = this.fb.group({
      processorName: ['', Validators.required],
      processorLogo: ['', Validators.required],
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
this.GetProcessorAllRecord(this.BizId);
this.thirdPartyForm.reset();
this.myInputVariable.nativeElement.value = '';

  }


  AllProcessorRecord:any
  GetProcessorAllRecord(BizId:number){
    this.mainService.GetbizSetupProcessorFormly(BizId).subscribe((res:any)=>{
      this.AllProcessorRecord = res;
      if(this.AllProcessorRecord?.length == 0){
        this.Toast.fire({
          icon: 'info',
          title: `no data`,
        }) 
      }
console.log("GetProcessorAllRecord",this.AllProcessorRecord);
    });
  }



FileByApi:any;
CurrentDate:any = new Date();
AddForm(form:any){
const processorName = form.value.processorName;
const fileData = form.value.processorLogo[0];
const formData = new FormData();
formData.append('file', fileData);
console.log("formdata", formData);
this.mainService.uploadFile(formData).subscribe((res) => {
  console.log("uploadResponse",res);
  this.FileByApi = res;
  this.FileByApi = this.FileByApi.file;
  const thirdPartyObj = {
    createdAt: this.CurrentDate,
    createdBy: this.loginUserId,
    updatedAt: this.CurrentDate,
    updatedBy: this.loginUserId,
    businessId: this.BizId,
    processorLogo:this.FileByApi,
    processorName: processorName
   };
    //  console.log("finalObj", thirdPartyObj);
     this.PostThirdParty(thirdPartyObj);

});
  }

  ThirdPartyRes:any
 PostThirdParty(thirdPartyObj:any){
if(this.BizId){
  this.mainService.PostbizSetupProcessorFormly(thirdPartyObj).subscribe((res)=>{
    this.ThirdPartyRes = res;
    this.ThirdPartyRes = this.ThirdPartyRes.processorName
    console.log("Fresponse",res);
    if(res){
      this.GetProcessorAllRecord(this.BizId);
      this.Toast.fire({
        icon: 'success',
        title: `Successfully added ${this.ThirdPartyRes}`,
      }) 
      this.thirdPartyForm.reset();
      this.myInputVariable.nativeElement.value = '';
    }
   
  })
}else{
  this.Toast.fire({
    icon: 'info',
    title: "Select business",
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
this.mainService.deleteprocData(rowId).subscribe((res)=>{
  this.deleteResponse = res;
  this.deleteResponse = this.deleteResponse.value.processorName;
  console.log(res);
  if(res){
    this.GetProcessorAllRecord(this.BizId);
    this.Toast.fire({
      icon: 'success',
      title: `${this.deleteResponse} deleted successfully`,
    }) 
  }
})
      }
    }); 
}


 ShowImage:any
  ShowImageModal(ShowImage:any) {
    // alert(2)
    this.ShowImage = ShowImage
  }
 

}
