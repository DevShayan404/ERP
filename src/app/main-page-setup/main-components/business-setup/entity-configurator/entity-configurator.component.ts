import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl, FormArray, } from '@angular/forms';
import { MainServiceService } from '../../../main-service/main-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entity-configurator',
  templateUrl: './entity-configurator.component.html',
  styleUrl: './entity-configurator.component.css'
})
export class EntityConfiguratorComponent {
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
  EntityForm!: FormGroup;
  loginUserId:any;

  AllTypes = [
    {"name":"Product"},
    {"name":"Service"},
    {"name":"Extra"}
  ]

 

  constructor(private fb: FormBuilder,private mainService:MainServiceService){
    this.GetBusiness();
    const x = localStorage.getItem('loginUserId');
    this.loginUserId =  Number(x);
    this.EntityForm = this.fb.group({
      entityName: ['', Validators.required],
      entityShortDesc: ['', Validators.required],
      entityType: ['', Validators.required],
      
      'Product': new FormArray([
        this.fb.group({
          'rentalFeeMin': new FormControl(''),
          'rentalFeeMax': new FormControl(''),
          'purchasingAmountMin': new FormControl(''),
          'purchasingAmountMax': new FormControl('')
        })
      ]),

      'Service': new FormArray([
        this.fb.group({
          'monthlyFeeMin': new FormControl(''),
          'monthlyFeeMax': new FormControl(''),
        })
      ]),
      'Extra': new FormArray([
        this.fb.group({
          'monthlyExtraFeeMin': new FormControl(''),
          'monthlyExtraFeeMax': new FormControl(''),
        })
      ]),
    });
  }

  get ProductFrmArr() {
    return this.EntityForm.controls['Product'] as FormArray;
  }
  get ServiceFrmArr() {
    return this.EntityForm.controls['Service'] as FormArray;
  }
  get ExtraFrmArr() {
    return this.EntityForm.controls['Extra'] as FormArray;
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


  BizId:any
  BizName:any
  onChangeBusiness(Biz:any){
this.BizId = Biz.value.businessId;
this.BizName = Biz.value.business;
this.GetEntityAllRecord(this.BizId);
this.EntityForm.reset();
console.log("onChangeBusiness",this.BizId);
  }

  GetTypeForm:any;
onChangeType(Type:any){
this.GetTypeForm = Type.value.name;
console.log("onChangeType",this.GetTypeForm);
}




AllEntityRecord:any;
productArray:any;
serviceArray:any;
extraArray:any;
EntityLength:any
  GetEntityAllRecord(BizId:number){
    this.mainService.GetbizSetupEntityFormly(BizId).subscribe((res:any)=>{
      this.AllEntityRecord = res;
      this.EntityLength = this.AllEntityRecord.length;
      console.log("entyu",this.EntityLength)
      this.ShowhideColumn = 'All';
      if(this.EntityLength > 0){
        // Filter objects based on "entityType"
this.productArray = this.AllEntityRecord.filter((obj:any) => obj.entityType === "Product");
this.serviceArray = this.AllEntityRecord.filter((obj:any) => obj.entityType === "Service");
this.extraArray = this.AllEntityRecord.filter((obj:any) => obj.entityType === "Extra");
      }

if(this.AllEntityRecord?.length == 0){
  this.Toast.fire({
    icon: 'info',
    title: `no data`,
  }) 
}
    });
  }

  ShowhideColumn:any
  AllRecord(All:any){
    this.GetEntityAllRecord(this.BizId);
    this.ShowhideColumn = All;
  }

  AllProduct(Product:any){
    this.AllEntityRecord = this.productArray;
    this.ShowhideColumn = Product;
  }
  AllService(Service:any){
    this.AllEntityRecord = this.serviceArray;
    this.ShowhideColumn = Service;
  }
  AllExtra(Extra:any){
    this.AllEntityRecord = this.extraArray;
    this.ShowhideColumn = Extra;
  }


FileByApi:any;
CurrentDate:any = new Date();
EntityRes:any;
AddForm(form:any){

console.log("entity",form.value)

const entityForm = form.value;
const serviceForm = form.value.Service[0];
const ProductForm = form.value.Product[0];
const ExtraForm = form.value.Extra[0];
const EntityObj = {
  createdAt: this.CurrentDate,
  createdBy: this.loginUserId,
  updatedAt: this.CurrentDate,
  updatedBy: this.loginUserId,
  businessId: this.BizId,
  entityName:entityForm.entityName,
  entityShortDesc:entityForm.entityShortDesc,
  entityType:this.GetTypeForm,
  ...serviceForm,
  ...ProductForm,
  ...ExtraForm
 };

 console.log("Entity",EntityObj)

 if(this.EntityForm.valid){
  this.mainService.PostbizSetupEntityFormly(EntityObj).subscribe((res)=>{
    this.EntityRes = res;
    this.EntityRes = this.EntityRes.entityName
    console.log("Fresponse",res);
    if(res){
      this.GetEntityAllRecord(this.BizId);
      this.Toast.fire({
        icon: 'success',
        title: `Successfully added ${this.EntityRes}`,
      }) 
      this.EntityForm.reset();
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
 this.mainService.deleteEntityData(rowId).subscribe((res)=>{
   this.deleteResponse = res;
   this.deleteResponse = this.deleteResponse.value.entityName;
   console.log(res);
   if(res){
    this.GetEntityAllRecord(this.BizId);
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
