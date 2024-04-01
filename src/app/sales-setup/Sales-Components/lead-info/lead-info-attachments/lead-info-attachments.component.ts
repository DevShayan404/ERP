import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lead-info-attachments',
  templateUrl: './lead-info-attachments.component.html',
  styleUrls: ['./lead-info-attachments.component.css']
})
export class LeadInfoAttachmentsComponent {
  date = new Date();
  form = this.fb.group({
  html: '',
});
  constructor(private fb: FormBuilder){
    this.showRemarks = this.AllRemarks;
  }
  StatusList: any = [
    {statusID: '0', status: 'All Types'},
    {statusID: '1', status: 'new order'},
    {statusID: '2', status: 'invoice order'},
    {statusID: '3', status: 'purchase order'},
    {statusID: '4', status: 'forms'}
  ];


  TabGroup(event:any){
    this.GetBizIdFromTab(this.StatusList[event.index].status)
}

showRemarks:any
GetBizIdFromTab(status:any){
console.log(status)
if(status === 'All Types'){
  this.showRemarks = this.AllRemarks;
}else{
  this.showRemarks  = this.AllRemarks.filter((item:any) => item.status === status);
}


console.log("remarks",this.AllRemarks)
}


sendRemark(){
  const obj = {
    status:'New',
    remarks:this.form.value.html,
    date:this.date
  }

  // this.showRemarks.push(obj)
  this.showRemarks.unshift(obj);
  console.log("sendRemark",this.form.value.html)
  this.form.reset();
}

  AllRemarks:any = [
    {
      "status": "new order",
      "remarks": "Client is not responding",
      "date": "2023-09-28"
    },
    {
      "status": "new order",
      "remarks": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,        ultricies eget, tempor sit amet, ante",
      "date": "2023-09-29"
    },
    {
      "status": "new order",
      "remarks": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,        ultricies eget, tempor sit amet, ante",
      "date": "2023-09-30"
    },
    {
      "status": "invoice order",
      "remarks": "ultricies eget, tempor sit amet, ante",
      "date": "2023-10-01"
    },
    {
      "status": "invoice order",
      "remarks": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae",
      "date": "2023-10-02"
    },
    {
      "status": "purchase order",
      "remarks": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae",
      "date": "2023-10-03"
    },
    {
      "status": "purchase order",
      "remarks": "ultricies eget, tempor sit amet, ante",
      "date": "2023-10-04"
    },
    {
      "status": "forms",
      "remarks": "ultricies eget, tempor sit amet, ante",
      "date": "2023-10-05"
    },
    {
      "status": "forms",
      "remarks": "ultricies eget, tempor sit amet, ante",
      "date": "2023-10-06"
    },
    {
      "status": "forms",
      "remarks": "ultricies eget, tempor sit amet, ante",
      "date": "2023-10-07"
    }
  ]
}
