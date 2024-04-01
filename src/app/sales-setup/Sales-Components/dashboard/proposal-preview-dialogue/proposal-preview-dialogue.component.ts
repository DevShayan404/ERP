
import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material/material.module';
import { SaleLeadService } from '../../../Sales-Services/sale-lead.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-proposal-preview-dialogue',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './proposal-preview-dialogue.component.html',
  styleUrl: './proposal-preview-dialogue.component.css'
})
export class ProposalPreviewDialogueComponent {


channelLogo:any;
processorLogo:any;
channelname:any;
processorname:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: SaleLeadService,
    private ref: MatDialogRef<ProposalPreviewDialogueComponent>
  ) {  }

  EntityArray:any;
  proposalid:any;
  proposalObject:any;
  bizname:any;
  ClientEmail:any;
  ClientName:any;
  ngOnInit() {
    console.log("Proposal preview object",this.data)
  this.proposalid = this.data.proposalId;
  this.bizname = this.data.businessName;
  this.ClientEmail = this.data.email;
  this.ClientName = this.data.personName;
  
this.service.Getproposal(this.proposalid).subscribe((data:any) => {
  this.EntityArray =  data.entities;
  this.proposalObject = data
  this.channelLogo = 'http://172.16.1.226:3600/'+data.channelLogo;
  this.channelname = data.channelName;
  this.processorname = data.processorName;
  this.processorLogo = 'http://172.16.1.226:3600/'+data.processorLogo;
})
  }


currentDate = new Date();
  sendproposal(){
const clientName = this.ClientName;
const clientEmail = this.ClientEmail
this.proposalObject.statusId = 109;
this.proposalObject.statusName = 'Proposal Sent';
this.proposalObject.updatedAt = this.currentDate;
// console.log("Proposal Object",this.proposalObject)

    const MailBody = {
      "to":[clientEmail],
      "subject":"Client Proposal",
      "body": `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f9f9f9; padding: 20px;">
      <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 30px; color: #3597ff;">MBE Canada</h1>
      <p style="margin-bottom: 20px;">Dear ${clientName},</p>
      <p style="margin-bottom: 20px;">To view your business form, simply click on the link below:</p>
      <p style="margin-bottom: 20px;"><a href='http://172.16.100.151:7857/clientproposal/?id=${this.proposalid}' style="color: #fff; background-color: #007bff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">View form</a></p>
      <p style="margin-bottom: 20px;">Thank you for choosing us</p>
      <p style="margin-bottom: 20px;">Sincerely,</p>
      <p style="margin-bottom: 20px; color: #007bff;">The MBE Team</p>
      <hr style="border: 0; border-bottom: 1px solid #ccc; margin-bottom: 30px;">
    </div>`,
    };
   this.service.sendMailToClient(MailBody).subscribe((data:any)=>{

    this.service.Insertproposal(this.proposalObject).subscribe((res:any)=>{
      console.log("proposal response",res);
    })
    this.closepopup();
   })
  }
  closepopup(){ 
    this.ref.close('closed');
  }
}
