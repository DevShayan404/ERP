import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material/material.module';
import { SaleLeadService } from '../../../Sales-Services/sale-lead.service';
import { CommonModule } from '@angular/common';
import { bounceInLeftOnEnterAnimation, bounceOutLeftOnLeaveAnimation, fadeInAnimation, fadeInLeftOnEnterAnimation, fadeInOnEnterAnimation, fadeOutLeftOnLeaveAnimation, slideInRightOnEnterAnimation, zoomInOnEnterAnimation } from 'angular-animations';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-proposal-dialogue',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule,CommonModule],
  animations: [
    slideInRightOnEnterAnimation(),
    fadeOutLeftOnLeaveAnimation(),
    fadeInLeftOnEnterAnimation(),
    fadeInOnEnterAnimation(),
    zoomInOnEnterAnimation(),
    fadeInAnimation(),
    bounceInLeftOnEnterAnimation(),
    bounceOutLeftOnLeaveAnimation(),
  ],
  templateUrl: './proposal-dialogue.component.html',
  styleUrl: './proposal-dialogue.component.css'
})
export class ProposalDialogueComponent {
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
  EntityTypelist = [
    { id: 1, value: 'Purchasing  amount' },
    { id: 2, value: 'Rental  amount' },
  ];
  URL = 'http://172.16.1.226:3600/'
  loginUserId:number
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: SaleLeadService,
    private ref: MatDialogRef<ProposalDialogueComponent>
  ) {
    const x = localStorage.getItem('loginUserId');
    this.loginUserId =  Number(x);
  }

  businessName:any
  ngOnInit(): void {
    console.log("data from dashboard",this.data)
   const businessId =  this.data.ticketObj.businessId;
   this.businessName =this.data.bizname;
   console.log("business from dashboard",businessId)
    this.GetAllEntity(businessId);
    this.GetChannel(businessId);
    this.GetProcessor(businessId);
  }

  channel!: any;
  processor!: any;
  EntityType: any;
  EntityLength: any;
  AllEntityRecord!: any;
  productArray!: any;
  serviceArray: any;
  extraArray: any;
  finalResponse:any;
  GetAllEntity(businessId:number) {
    this.service.GetEntity(businessId).subscribe((res:any)=>{
this.finalResponse = res;
const selectedValue = { selectedValue: null };
this.finalResponse = res.map((val: any) => {
  const value = val;
  this.finalResponse = { ...value, ...selectedValue , finalAmount:'',checked:false };
  return this.finalResponse;
});

console.log("finalResponse",this.finalResponse)
    this.EntityLength = this.finalResponse.length;
    if (this.EntityLength > 0) {
      this.ShowhideColumn = 'Product';
      // Filter objects based on "entityType"
      this.productArray = this.finalResponse.filter(
        (obj: any) => obj.entityType === 'Product'
      );
      this.AllEntityRecord = this.productArray;
      this.serviceArray = this.finalResponse.filter(
        (obj: any) => obj.entityType === 'Service'
      );
      this.extraArray = this.finalResponse.filter((obj: any) => obj.entityType === 'Extra');
    }
    })
  }


  AllChannel:any;
  GetChannel(businessId:number){
    this.service.GetSetupChannel(businessId).subscribe((res:any)=>{
      this.AllChannel = res;
    })
  }


  AllProcessor:any;
  GetProcessor(businessId:number){
    this.service.GetbizSetupProcessor(businessId).subscribe((res:any)=>{
      this.AllProcessor = res;
    })
  }

  channelLogo:any;
  channelname:any;
  channelId!:number;
  showOverview:boolean=false;
  changeChannel(val: any) {
    this.showOverview = true;
    this.channelname = val.value.channelName;
    this.channelId = val.value.id;
    this.channelLogo = this.URL + val.value.channelLogo;
    console.log("channel ID",this.channelId);
    console.log("channel",val);
  }

  processorLogo:any;
  processorname:any;
  processorId!:number;
  alter = '/assets/noiamge.jpg'
  changeprocessor(val: any) {
    this.showOverview = true;
    this.processorname = val.value.processorName;
    this.processorLogo = this.URL +  val.value.processorLogo;
    this.processorId = val.value.id;
    console.log("PRocessor ID",this.processorId);
    console.log("Processor",val);
  }



  changeAmount(val: any, tableRow: any) {
    tableRow.finalAmount = '';
    if (val.value == 1) {
      tableRow.minmax = 'Purchase';
    } else if (val.value == 2) {
      tableRow.minmax = 'Rental';
    }

    // console.log('tableRow', tableRow, val.value);
  }

  ShowhideColumn: any;
  TSindex = null;
  AllProduct(Product: any) {
    this.AllEntityRecord = this.productArray;
    this.ShowhideColumn = Product;
    this.TSindex = Product;
    console.log("entity record",this.AllEntityRecord)
  }

  AllService(Service: any) {
    this.AllEntityRecord = this.serviceArray;
    this.ShowhideColumn = Service;
    this.TSindex = Service;
  }

  AllExtra(Extra: any) {
    this.AllEntityRecord = this.extraArray;
    this.ShowhideColumn = Extra;
    this.TSindex = Extra;
  }


  limitInputValue(tableRow: any, type: any): void {
    // console.log('hello', tableRow , type);
    if (type == 'purchase') {
      const value = tableRow.finalAmount;
      if (typeof value === 'number') {
        if (value < tableRow.purchasingAmountMin) {
          tableRow.finalAmount = tableRow.purchasingAmountMin;
        } else if (value > tableRow.purchasingAmountMax) {
          tableRow.finalAmount = tableRow.purchasingAmountMax;
        }
      } else if (typeof value === 'string' && value !== '') {
        const numericValue = +value;
        if (
          numericValue < tableRow.purchasingAmountMin ||
          numericValue > tableRow.purchasingAmountMax
        ) {
          tableRow.finalAmount = '';
        }
      }
    }else if (type == 'rental') {
      const value = tableRow.finalAmount;
      if (typeof value === 'number') {
        if (value < tableRow.rentalFeeMin) {
          tableRow.finalAmount = tableRow.rentalFeeMin;
        } else if (value > tableRow.rentalFeeMax) {
          tableRow.finalAmount = tableRow.rentalFeeMax;
        }
      } else if (typeof value === 'string' && value !== '') {
        const numericValue = +value;
        if (
          numericValue < tableRow.rentalFeeMin ||
          numericValue > tableRow.rentalFeeMax
        ) {
          tableRow.finalAmount = '';
        }
      }
    }else if (type == 'service') {
      const value = tableRow.finalAmount;
      if (typeof value === 'number') {
        if (value < tableRow.monthlyFeeMin) {
          tableRow.finalAmount = tableRow.monthlyFeeMin;
        } else if(value > tableRow.monthlyFeeMax) {
          tableRow.finalAmount = tableRow.monthlyFeeMax;
        }
      } else if (typeof value === 'string' && value !== '') {
        const numericValue = +value;
        if (
          numericValue < tableRow.monthlyFeeMin ||
          numericValue > tableRow.monthlyFeeMax
        ) {
          tableRow.finalAmount = '';
        }
      }
    }else if (type == 'extra') {
      const value = tableRow.finalAmount;
      if (typeof value === 'number') {
        if (value < tableRow.monthlyExtraFeeMin) {
          tableRow.finalAmount = tableRow.monthlyExtraFeeMin;
        } else if(value > tableRow.monthlyExtraFeeMax) {
          tableRow.finalAmount = tableRow.monthlyExtraFeeMax;
        }
      } else if (typeof value === 'string' && value !== '') {
        const numericValue = +value;
        if (
          numericValue < tableRow.monthlyExtraFeeMin ||
          numericValue > tableRow.monthlyExtraFeeMax
        ) {
          tableRow.finalAmount = '';
        }
      }
    }
  }


  EntityArray:any=[]
  GetChekedValue(status: any, checkedRow: any) {
    checkedRow.checked = status.target.checked;
    if(checkedRow.checked == true){
      this.EntityArray.push(
        {
          setupEntityId:checkedRow.id,
          entityName:checkedRow.entityName,
          entityType:checkedRow.entityType,
          finalAmount:checkedRow.finalAmount,
          paymentType:checkedRow?.minmax?checkedRow.minmax:'Monthly fee'
        });
     
       
      console.log("Entity Array",this.EntityArray);
    }else if(checkedRow.checked == false){
  const idToRemove = checkedRow.id;
  this.EntityArray = this.EntityArray.filter((obj:any) => obj.setupEntityId !== idToRemove);

console.log(this.EntityArray);

    }
    // this.EntityArray.push(checkedRow)
    console.log("checked row",checkedRow.checked);
    console.log("entity record",this.AllEntityRecord)
  }


  hasProduct(): boolean {
    return this.EntityArray.some((item:any) => item.entityType === 'Product');
  }
  hasService(): boolean {
    return this.EntityArray.some((item:any) => item.entityType === 'Service');
  }

  hasExtra(): boolean {
    return this.EntityArray.some((item:any) => item.entityType === 'Extra');
  }

CurrentDate:any = new Date();
  PostProposal(){
    // console.log(this.EntityArray)
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mr-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true
    });
    swalWithBootstrapButtons.fire({
      title: "Have you complete your setup?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Save it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
      
        this.Toast.fire({
          icon: 'success',
          title: 'Saved Successfully',
        });
  
       const ProposalfinalObj = {
        ...this.data.ticketObj,
        "createdAt": this.CurrentDate,
        "createdBy": this.loginUserId,
        "updatedAt": this.CurrentDate,
        "updatedBy": this.loginUserId,
        "channelId":  this.channelId,
        "processorId":this.processorId,
        "entities": this.EntityArray,
        "statusId": 108,
        "statusName": "Proposal Generated"
      }
      console.log("proposal Data",ProposalfinalObj)
      this.service.Insertproposal(ProposalfinalObj).subscribe((res:any)=>{
        console.log("proposal response",res);
        this.closepopup(res.id);
      })

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

  closepopup(proposalID:any){ 
    this.ref.close(proposalID);
  }
  

}
