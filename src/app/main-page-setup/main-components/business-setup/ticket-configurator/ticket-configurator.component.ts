import { Component } from '@angular/core';
import {FormBuilder, Validators,FormGroup, FormControl} from '@angular/forms';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable, map, startWith } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MainServiceService } from '../../../main-service/main-service.service';
import Swal from 'sweetalert2';
import { SubjectServiceService } from '../../../main-service/subject-service.service';
@Component({
  selector: 'app-ticket-configurator',
  templateUrl: './ticket-configurator.component.html',
  styleUrl: './ticket-configurator.component.css'
})
export class TicketConfiguratorComponent {
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

  isLinear = true;
  isEditable = false;
  BusinessForm = this._formBuilder.group({
    business: new FormControl( '' ),
    businessId:new FormControl( '',Validators.required),
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

  FieldsForm!:FormGroup;
  optionsForm!:FormGroup;
  listData:any = [];

  stepperOrientation: Observable<StepperOrientation>;

  cars: any[] = [];
  constructor(private service:MainServiceService,private subjectService:SubjectServiceService, private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {

    this.listData = [];
    this.GetBusiness();
    this.FieldsForm = this._formBuilder.group({
      fieldName: new FormControl( '',Validators.required),
      fieldType: new FormControl( '',Validators.required),
  });

  this.optionsForm = this._formBuilder.group({
    id:[''],
    name:['', Validators.required],
  });
  
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {
  }

  refreshBusiness(){
    this.GetBusiness();
  }

//////////////////////////Step 1/////////////
  ShowNewBusinessField:boolean = false;
  BusnessBtnName:string = 'Add New Business'
  AddNewBusinessbtn(){
    this.BusinessForm.reset();
    if(this.ShowNewBusinessField == true){
this.BusnessBtnName = 'Add New Business';
this.ShowNewBusinessField = false
    }else if(this.ShowNewBusinessField == false){
      this.BusnessBtnName = 'Show Existing Business';
      this.ShowNewBusinessField = true
    }
  }


 

  BusinessList:any=[]
  GetBusiness(){
    this.service.GETBusinessName().subscribe((res:any)=>{
      this.BusinessList = res;
      console.log("All business",res);
    })
  }

  InsertNewBusiness(){
    const businessObj = {
      business: this.BusinessForm.value.business,
      createdAt:this.CurrentDate,
      updatedAt:this.CurrentDate,
    }
    if(businessObj.business != null && businessObj.business != "" && businessObj.business != undefined){
      this.service.PostBusinessName(businessObj).subscribe((res:any)=>{
        if(res.id){
          this.Toast.fire({
            icon: 'success',
            title: `${businessObj.business} added to business list`,
          }) 
        }else{
          this.Toast.fire({
            icon: 'error',
            title: 'Please try again',
          }) 
        }
        this.GetBusiness();
        this.BusinessForm.reset();
      })
    }else{
      this.Toast.fire({
        icon: 'info',
        title: 'Enter business name',
      }) 
    }

  }

  busienssLabel:any = 'Business name';
  businessObj:any
  SubmitBusiness(){
    // this.busienssLabel = this.BusinessForm.value.business;
     this.businessObj = this.BusinessList.find((val:any) => val.businessId == this.BusinessForm.value.businessId);
     this.busienssLabel = this.businessObj.business;
     if(this.businessObj.ticketFields){
      this.listData = this.businessObj.ticketFields;
      console.log("Ticket ibj",this.businessObj);
     }

     this.service.GetTicketFormlyForm(this.businessObj.businessId).subscribe((val:any)=>{
      console.log("formlyobj",val);
      this.formlyId = val?.id;
    });
   
    console.log("Business Object",this.businessObj);
  }

  
  //////////////////////////Step 1 end/////////////



  /////////////Step 2 Add fields/////////////////

  
  public addItem(){
    if(this.FieldsForm.valid){
      this.listData.push(this.FieldsForm.value);
      this.FieldsForm.reset();
    }else{
      this.Toast.fire({
        icon: 'info',
        title: 'Please insert values',
      })  
    }

  }

  reset(){
    this.FieldsForm.reset();
  }
  
  removeItem(element:any){
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
        this.listData.forEach((value:any,index:any) => {
          if(value == element)
          this.listData.splice(index,1);
      });
        }
      }); 
  }
  removeOption(OptionRow:any , fieldName:any){
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
        this.finalDropdownList.map((value:any)=>{
          if(fieldName == value.fieldName){
            value.options.forEach((option:any,index:any) => {
              if(option == OptionRow){
         value.options.splice(index,1);
              }       
          });
        
          }
        })
      }
     
    })
  }

  finalDropdownList:any=[]
  DropDownKey:any
  otherFields:any=[]
  AddFieldObj() {

      this.finalDropdownList = [];
      this.otherFields = [];
      this.listData.map((val:any)=>{
        if(val.fieldType == 'Dropdown list'){
       let key = val.fieldName.replace(/\s/g, '');
       const obj =   {
        fieldName:val.fieldName,
        fieldType:val.fieldType,
        options: val.options ? val.options : [],
        key: key
        }
        //Add all dropdowns here with/without existing options
  this.finalDropdownList.push(obj);
        }else if(val.fieldType != 'Dropdown list'){
          let key = val.fieldName.replace(/\s/g, '');
          const obj =   {
           fieldName:val.fieldName,
           fieldType:val.fieldType,
           key: key
           }
           //add all other fields here new or existing
          this.otherFields.push(obj);
        }
      })
    
      // console.log("dropdown",this.finalDropdownList);
      // console.log("Input fields",this.otherFields);

   
    
}
/////////////Step 2 Add fields END/////////////////




//////////////////Step 3 Get only Dropdown list///////////

Optionslist:any=[]
NewOptionsObj:any
addOptions(label:any){
if(this.optionsForm.valid){
this.finalDropdownList.map((val:any) => {
  if(val.fieldName == label){
    val.options.push(this.optionsForm.value)
    //All the options coming from optionForm will push to val and and that complete val will = NewOptionIObj after the map complete
    this.NewOptionsObj = val;
    // console.log("adding option obj",this.NewOptionsObj);
  }
  });
  this.UpdateOptionList(label);
  this.optionsForm.reset();
}else{
  this.Toast.fire({
    icon: 'info',
    title: 'Please insert values',
  })  
}
}

finalDropdowns:any=[]
UpdateOptionList(label:any){
  if(label == this.NewOptionsObj.fieldName){
   const obj =  {
    fieldName:this.NewOptionsObj.fieldName,
    fieldType:this.NewOptionsObj.fieldType,
    key: this.NewOptionsObj.key,
    options:this.NewOptionsObj.options
  }
 
  // with this filter same name of old dropdown will replace with the new one and then push
  this.finalDropdowns = this.finalDropdowns.filter((val:any) => val.fieldName != label);
  this.finalDropdowns.push(obj);
  console.log("final check",this.finalDropdowns);
  this.Toast.fire({
    icon: 'success',
    title: `${this.NewOptionsObj.fieldName} updated successfully`,
  }) 
  }else{

    this.Toast.fire({
      icon: 'error',
      title: `First update ${this.NewOptionsObj.fieldName}`,
    })  
  }
}

CompleteBusiness:any=[]
formlyDropDown:any=[]
formlyOtherFields:any=[]
MappedOptions:any;
CurrentDate:any = new Date();
InsertOptionsObj(){
  // check those dropdowns where no option added 
  let WithOutSelectingOptions = this.finalDropdownList.filter((o1:any) => !this.finalDropdowns.some((o2:any) => o1.fieldName === o2.fieldName));
const businessID = this.businessObj.businessId;
const businessName = this.businessObj.business;
const CompletefollowupFields = [ ...this.otherFields, ...this.finalDropdowns, ...WithOutSelectingOptions];

this.CompleteBusiness = {
id:this.businessObj.id,
businessId:businessID,
business:businessName,
createdAt:this.CurrentDate,
updatedAt:this.CurrentDate,
followupFields:this.businessObj.followupFields,
ticketFields:CompletefollowupFields,
profileFields:this.businessObj.profileFields,
}
console.log("Completefollowup",this.CompleteBusiness)
this.service.PostBusinessName(this.CompleteBusiness).subscribe((res:any)=>{

  console.log("Business Response",res);


////////////////////Post Formly obj/////////////////
const CompleteBusinessObj =  this.CompleteBusiness.ticketFields;
console.log("CompleteBusinessObj",CompleteBusinessObj)
CompleteBusinessObj.map((val:any)=>{
  console.log(val);
  if(val.fieldType == "Dropdown list"){
    this.MappedOptions = [];
    val.options.map((options:any)=>{
     const obj = {
        value:options.name.replace(/\s/g, ''),
        label:options.name ? options.name : []
      } 
     this.MappedOptions.push(obj); 
    });
    const DropDownObj =  {
      props: {
          label:val.fieldName ,
          options: this.MappedOptions,
      },
      key: val.key,
      type: "select",
    }
    this.formlyDropDown.push(DropDownObj);
    // console.log("Dropdown Options",this.formlyDropDown);

  }else if(val.fieldType != "Dropdown list"){
    const OtherFieldObj = 
    {
      props: {
        label:val.fieldName ,
        options: [],
          type: val.fieldType,
          "required": true,
      },
      key: val.key,
      type: "input",
  }
     this.formlyOtherFields.push(OtherFieldObj)
  }


});
this.GetFormlyForm();
})
 
}

 ///////////////STep 3 end////////////

 formlyId:any
 GetFormlyForm(){

 const formly = [...this.formlyDropDown,...this.formlyOtherFields];
 if(!this.businessObj.ticketFields){
  this.formlyId = null;
 }
 const FormlyFinalObj = {
  id:this.formlyId,
  createdAt:this.CurrentDate,
updatedAt:this.CurrentDate,
  formlyName: this.businessObj.business,
  businessId: this.businessObj.businessId,
  attributes: formly,
 }

 console.log("FormlyFinalObj",FormlyFinalObj)

 this.service.PostTicketFormlyForm(FormlyFinalObj).subscribe((res:any)=>{
console.log("formly respnse",res)
this.Toast.fire({
  icon: 'success',
  title: `${this.businessObj.business} updated successfully`,
}) 
this.GetBusiness();
 });

 }

 ResetAllArrays(){
  alert("Reset All Arrays")
  this.formlyDropDown = [];
  this.formlyOtherFields = [];
  this.MappedOptions = [];
  this.CompleteBusiness = [];
  this.finalDropdowns = [];
  this.otherFields = [];
  this.finalDropdownList = [];
 }

  /////////////////////////FILTER/////////////////////
  options = ['POS', 'ATM', 'MBPP'];
  DataTypes = ['Number', 'Text', 'Dropdown list'];



  public hideShowDropdown: boolean[] = [];
  toggleDropdown(index: any) {  
      if( this.hideShowDropdown[index] == undefined){
        this.hideShowDropdown[index] = false;
        
      }
      else{
        this.hideShowDropdown[index] =
        !this.hideShowDropdown[index];
      }
  }
}
