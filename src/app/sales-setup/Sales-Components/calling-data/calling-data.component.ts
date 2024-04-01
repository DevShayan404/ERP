import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-calling-data',
  templateUrl: './calling-data.component.html',
  styleUrls: ['./calling-data.component.css']
})
export class CallingDataComponent {
 filterChipsArray:any=[]
  AgentList = [
    {agentId:1,agent:'shahbaz'},
    {agentId:2,agent:'shuja'},
    {agentId:3,agent:'ahmer'},

  ]

  AgentObj:any
  Agent:any
  onChangeAgent(val:any){
    console.log("agent",val.value.agent)
    this.AgentObj = {
      name:'Agent',
      val:val.value.agent
    }
  }
  
  Status:any
  StatusObj:any
  onChangeStatus(val:any){
    console.log("status",val)
    this.StatusObj = {
      name:'Status',
      val:val.value.agent
    }
  }
  Source:any
  SourceObj:any
  onChangeSource(val:any){
    console.log("source",val)
    this.SourceObj = {
      name:'Source',
      val:val.value.agent
    }
  }

////////////////////Datepuickr/////////////
formatedDate:any
DateFormate(date:any){
  var year = date.getFullYear();
  let day = date.getDate();
  var month = date.getMonth() + 1;
  if (month <= 9) month = '0' + month;
  this.formatedDate = `${month}-${day}-${year}`;
  return this.formatedDate;
}

ResetcreatedFrom:any
createdFromObj:any
DPcreateFrom(event: MatDatepickerInputEvent<Date>) {
this.ResetcreatedFrom =  event.value;
this.DateFormate(event.value);
   this.createdFromObj = {
    name:'created from',
    val:this.formatedDate
  }
  console.log("DPcreateFrom",this.createdFromObj )
}


createdToObj:any
Resetcreatedto:any
DPcreateTo( event: MatDatepickerInputEvent<Date>) {
  this.Resetcreatedto =  event.value;
  this.DateFormate(event.value);
     this.createdToObj = {
      name:'created to',
      val:this.formatedDate
    }
    console.log("DPcreateTo",this.createdToObj )
  }

  ResetupdateFrom:any;
  UpdateFromObj:any;
  DPUpdateFrom( event: MatDatepickerInputEvent<Date>) {
  this.ResetupdateFrom =  event.value;
  this.DateFormate(event.value);
     this.UpdateFromObj = {
      name:'update from',
      val:this.formatedDate
    }
    console.log("DPUpdatefrom",this.UpdateFromObj )
  }

  ResetupdateTo:any;
  UpdatetoObj:any;
  DPUpdateTo( event: MatDatepickerInputEvent<Date>) {
  this.ResetupdateTo =  event.value;
  this.DateFormate(event.value);
     this.UpdatetoObj = {
      name:'update to',
      val:this.formatedDate
    }
    console.log("DPUpdateTo",this.UpdatetoObj )
  }

  ResetFollowFrom:any;
  FollowfromObj:any;
  DPFollowFrom( event: MatDatepickerInputEvent<Date>) {
  this.ResetFollowFrom =  event.value;
  this.DateFormate(event.value);
     this.FollowfromObj = {
      name:'Follow from',
      val:this.formatedDate
    }
    console.log("DPFolloeFrom",this.FollowfromObj )
  }

  ResetFollowTo:any
  FollowtoObj:any;
  DPFollowTo( event: MatDatepickerInputEvent<Date>) {
  this.ResetFollowTo =  event.value;
  this.DateFormate(event.value);
     this.FollowtoObj = {
      name:'Follow to',
      val:this.formatedDate
    }
    console.log("DPcFollowTo",this.FollowtoObj )
  }


  search(){
    this.filterChipsArray = [this.AgentObj,this.StatusObj,this.SourceObj,this.createdFromObj,this.createdToObj, this.UpdateFromObj,this.UpdatetoObj,this.FollowfromObj,this.FollowtoObj]
    this.filterChipsArray = this.filterChipsArray.filter((item:any) => item !== undefined);
    console.log("DPsearch",this.filterChipsArray)
  }

  reset(model:NgForm){
    this.filterChipsArray = [];
    this.AgentObj = undefined;
    this.StatusObj = undefined;
    this.SourceObj = undefined;
    this.createdFromObj = undefined;
    this.createdToObj = undefined;
    this.UpdateFromObj = undefined;
    this.UpdatetoObj = undefined;
    this.FollowfromObj = undefined;
    this.FollowtoObj = undefined;
    model.reset();
  }
  
}
