import { Component, OnInit } from '@angular/core';
import { SaleLeadService } from '../../../Sales-Services/sale-lead.service';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EChartsOption } from 'echarts';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { SaleSubjectService } from '../../../Sales-Services/sale-subject.service';
import { ProposalDialogueComponent } from '../proposal-dialogue/proposal-dialogue.component';
import { ProposalPreviewDialogueComponent } from '../proposal-preview-dialogue/proposal-preview-dialogue.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit{
  loginUserId: any;
  FollowUpList: any = [];
  chart:boolean= true;
  chartOption!: EChartsOption;
  chartOption2!:EChartsOption;
  LogoUrl:any= 'http://172.16.1.226:3600/';
  data: any =  [
    { value: 7, name: 'Follow up' },
    { value: 5, name: 'interesting' },
    { value: 7, name: 'most interesting' },
    { value: 9, name: 'no foolowup' },
  ]

  data2: any =  [
    { value: 7, name: 'lead' },
    { value: 5, name: 'E-sign' },
    { value: 7, name: 'commision' },
    { value: 9, name: 'Account' },
  ]

  constructor(private service: SaleLeadService, private router:Router, private route:ActivatedRoute, private subjectService:SaleSubjectService,public dialog: MatDialog) {
    this.loginUserId = localStorage.getItem('loginUserId');
    this.getStatusList(this.loginUserId);
    // this.getChartsr(); 
  }
 

  ChartFollowUpname:any = [];
  ChartbusinessName:any=[];
  getStatusList(UserLogin: any) {
    this.ChartFollowUpname = [];
    this.ChartbusinessName = [];
    this.service.GetDashboardStatusList(UserLogin).subscribe((status) => {
      this.FollowUpList = status;
      console.log("FollowUp list",UserLogin, this.FollowUpList);
      this.FollowUpList.map((val:any)=>{
        const obj = {
          value: val.totalCount,
          name: val.statusName
        }
        this.ChartFollowUpname.push(obj)
val.biz.map((biz:any)=>{
 
  const obj = {
    value: 1,
    name: biz.businessName
  }
  this.ChartbusinessName.push(obj)
})
      });

      this.getcoloredPie();
    });
  }

  businessList: any;
  statusId:any;
  showProposalbtn:any
  getStatusBuisness(status: any) {
    console.log("status",status)
    this.showProposalbtn = status.statusId;
    
    this.selectedBizIndex = null;
    this.businessList = status.biz;
    this.statusId = status.statusId;
    console.log("BusinessList",this.businessList);
  }


  public selectedBizIndex:number | null = null;
  AllTickets:any = [];
  
  getBusinessTicketList(businessID:any,index:number){
    console.log("Business name",businessID);
    this.selectedBizIndex = index;
const userID = this.loginUserId;
const statusId = this.statusId;
const businessId = businessID;

console.log("user info",userID,statusId,businessId)
if(statusId == 106){
this.service.GetUserTickets(userID,businessId,statusId).subscribe(data =>{
  this.chart = false;
  this.AllTickets = data;
console.log("Ticket table approved",data);
})
}else{
  this.service.GetUserLeadsByStatus(userID,statusId,businessId).subscribe(data =>{
    this.chart = false;
    this.AllTickets = data;
console.log("Ticket table",data);
  })
}
  }


  // SetTicketForSubject:any;
  redirectToLeadInfo(ticket:any){
    // this.SetTicketForSubject = ticket;
const url = this.router.serializeUrl(
  this.router.createUrlTree(['navbar/leadInfo'])
);
if(this.statusId == 106){
  window.open(`${url}?id=${ticket.leadId}`, '_blank');
}
else{
  window.open(`${url}?id=${ticket.leadGroupNumber}`, '_blank');
}

  }

  ticketIndex!:number
  proposalSetup(ticket:any , i:number){
    console.log("ticket detail",ticket);
    this.ticketIndex = i;
    const bizname =  ticket.businessName
  const ticketObj = {
    leadNumber:ticket.leadNumber,
    ticketId:ticket.id,
    leadId:ticket.leadId,
    businessId:ticket.businessId,
    agentId:ticket.agentId,
    coordinatorId:999,
    }
    if(ticket.proposalId == '0'){
      this.OpenpopupProposal(ticketObj,bizname);
    }else{
      alert('Proposal already exists')
    }

  }

  

  ticketId:any
  OpenpopupProposal(ticketObj:any,bizname:any){
    var _popup =  this.dialog.open(ProposalDialogueComponent,{

      width: '100%',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      panelClass: 'full-screen-dialog',
      enterAnimationDuration:'100ms',
      exitAnimationDuration:'600ms',
      data:{ticketObj,bizname}
      
          });
          _popup.afterClosed().subscribe((item: any)=>{ 
            if(item){
              this.ticketId = item;
              this.AllTickets[this.ticketIndex].proposalId = item;
              console.log("After close modaal",this.AllTickets,this.ticketId);
            }

            //we can refresh our function here eg:this.getdata();
          })
  }


  previewProposalObj:any
  PreviewProposal(ticketObj:any){
    // console.log("Proposal object",ticketObj);
    if(ticketObj.proposalId != '0'){
      // this.ticketId = ticketObj.proposalId;
      this.previewProposalObj = ticketObj
      this.OpenpopupPreview();
    }else{
      alert("No proposal setup found")
    }

  }

  OpenpopupPreview(){
    var _popup =  this.dialog.open(ProposalPreviewDialogueComponent,{

      width: '100%',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      panelClass: 'full-screen-dialog',
      enterAnimationDuration:'100ms',
      exitAnimationDuration:'600ms',
      data:this.previewProposalObj
      
          });
          _popup.afterClosed().subscribe((item: any)=>{
            console.log(item)
            //we can refresh our function here eg:this.getdata()
          })
  }

  //////Date range///////
  dateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  GetRangeFollowUps:any
  ngOnInit(): void {
    this.dateRange.get('end')?.valueChanges.subscribe((end)=>{
      const start = this.dateRange.value.start;
      // console.log(start,end);
      this.service.GetUserLeadsBydateRange(this.loginUserId,start,end).subscribe((range: any)=>{
        this.GetRangeFollowUps = range;
        console.log("range",start,end,this.loginUserId,this.GetRangeFollowUps);

      })  
  })
}

  
  public selectedCardIndex: number | null = null;
  public selectStatusCard(index: number): void {
    console.log(index);
    this.selectedCardIndex = index;
  }

  calenderShow:boolean = false;
  showCalender(){
this.calenderShow = true;

  }




  vegetables: any = [
    {name: 'apple'},
    {name: 'banana'},
    {name: 'strawberry'},
    {name: 'orange'},
    {name: 'kiwi'},
    {name: 'cherry'},
  ];



uniqueBusiness:any
getcoloredPie(){
  //  this.uniqueBusiness = [...new Set(this.ChartbusinessName.map((item:any) => item.name))];
   this.uniqueBusiness = this.ChartbusinessName.filter((obj:any, index:any) => {
    return index === this.ChartbusinessName.findIndex((o:any) => obj.name === o.name);
    
});



  console.log("uniqueBusiness Business",this.uniqueBusiness);
  this.chartOption  =   {
    title: {
      // text: 'Referer of a Website',
      subtext: 'Follow up',
      left: 'center'
    },
    color: [
 '#8E2AA7',
 '#B25FC7',
 '#DF8CF3',
 '#F0B4FF'
],
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data:this.ChartFollowUpname,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  this.chartOption2  =   {
    title: {
      // text: 'Referer of a Website',
      subtext: 'Business',
      left: 'center'
    },
    color: [
      '#8935AB',
      '#A851CB',
      '#CB6FF0',
      '#D781F9'

],
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data:this.uniqueBusiness,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
}


handleImageError(item:any){
  item.businessLogo = '/assets/errorbusiness.png'
}


}
