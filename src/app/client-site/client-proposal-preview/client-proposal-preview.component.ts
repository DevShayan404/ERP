import { Component } from '@angular/core';
import { ServiceService } from '../../service.service';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-proposal-preview',
  standalone: true,
  imports: [MaterialModule,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './client-proposal-preview.component.html',
  styleUrl: './client-proposal-preview.component.css'
})
export class ClientProposalPreviewComponent {
  clientRemarks:any
  channelLogo:any;
  processorLogo:any;
  channelname:any;
  processorname:any;
  
  proposalID:any
    constructor(private service:ServiceService,private route: ActivatedRoute,) { 
      this.route.queryParams.subscribe((queryparam) => {
        this.proposalID = queryparam['id'];
        this.showProposal(this.proposalID);
      });
     }
    EntityArray:any
    ngOnInit() {
      // 65c35bf69327e257d735871c
    
    }

    proposalObject:any
    showProposal(proposalID:any){
      this.service.Getproposal(proposalID).subscribe((data:any) => {
        this.EntityArray =  data.entities;
        this.proposalObject = data;
        this.clientRemarks = this.proposalObject.clientRemarks;
        this.channelLogo = 'http://172.16.1.226:3600/'+data.channelLogo;
        this.channelname = data.channelName;
        this.processorname = data.processorName;
        this.processorLogo = 'http://172.16.1.226:3600/'+data.processorLogo;
        console.log("data",data);
      })
    }


    currentDate = new Date();
    ClientApproval(status:any){
if(status == 'Approve'){
  this.proposalObject.statusId = 110;
  this.proposalObject.statusName = 'Proposal Accepted';
  this.proposalObject.clientRemarks = this.clientRemarks;
  this.proposalObject.updatedAt = this.currentDate;
console.log("Proposal Object",this.proposalObject)

if(this.clientRemarks){
  this.service.Insertproposal(this.proposalObject).subscribe((res:any)=>{
    console.log("proposal response",res);
  })
}else{
  alert("please enter remarks")
}



}else if(status == 'Declined'){

  this.proposalObject.statusId = 111;
  this.proposalObject.statusName = 'Proposal Declined';
  this.proposalObject.clientRemarks = this.clientRemarks;
  this.proposalObject.updatedAt = this.currentDate;
  console.log("Proposal Object",this.proposalObject)

  if(this.clientRemarks){
    this.service.Insertproposal(this.proposalObject).subscribe((res:any)=>{
      console.log("proposal response",res);
    })
  }else{
    alert("please enter remarks")
  }
}
    }
}
