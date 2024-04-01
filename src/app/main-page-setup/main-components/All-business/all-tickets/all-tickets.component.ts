
import { MaterialModule } from '../../../../material/material.module';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MainServiceService } from '../../../main-service/main-service.service';
import { DatePipe } from '@angular/common';
import { SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeadRequestDailogComponent } from '../../../../sales-setup/Sales-Components/lead-info/lead-request-dailog/lead-request-dailog.component';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-all-tickets',
  standalone: true,
  imports: [MaterialModule,DatePipe,SlicePipe,NgxSkeletonLoaderModule,FormsModule],
  templateUrl: './all-tickets.component.html',
  styleUrl: './all-tickets.component.css'
})
export class AllTicketsComponent {

  CUstomerList:any=[]
  dataSource:any;
  displayedColumns:string[]=["personName","companyName","email","mobile","createdByName","businessName","createdAt","agentRemarks","coordinatorRemarks","statusName","Action"];
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

constructor(private mainService:MainServiceService,public dialog: MatDialog,){
this.GetAllTickets();
}

AllTicketsForFilter:any
GetAllTickets(){
  this.mainService.GetAllTickets().subscribe(tickets =>{
    console.log("tickets",tickets); 
    this.AllTicketsForFilter = tickets;
    this.CUstomerList = tickets;
    this.getFilterLists(this.CUstomerList);
    this.dataSource = new MatTableDataSource<any>(this.CUstomerList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
}

statusList:any;
businessList:any;
AgentList:any;
getFilterLists(list:any){
  const uniqueStatusNames = [...new Set(list.map((ticket:any) => ticket.statusName))];
  this.statusList = uniqueStatusNames;
  const uniqueBusinessNames = [...new Set(list.map((ticket:any) => ticket.businessName))];
  this.businessList = uniqueBusinessNames;
  const uniqueAgentNames = [...new Set(list.map((ticket:any) => ticket.createdByName))];
  this.AgentList = uniqueAgentNames;


  console.log("list",this.statusList , this.businessList , this.AgentList);
}

filterStatus:any
changeStatus(statusVal:any){
  this.CUstomerList =  this.AllTicketsForFilter;
  this.filterStatus = statusVal.value;

  const filteredTickets = this.CUstomerList.filter((ticket:any) => {
    return (
      (!this.filterStatus || ticket.statusName === this.filterStatus) &&
      (!this.filterBiz ||ticket.businessName  === this.filterBiz) &&
      (!this.filterAgent || ticket.createdByName === this.filterAgent)
    );
  });

this.CUstomerList = filteredTickets;
    this.dataSource = new MatTableDataSource<any>(this.CUstomerList);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

}


filterBiz:any
changeBusiness(biz:any){
  this.CUstomerList =  this.AllTicketsForFilter;
  this.filterBiz = biz.value;

  const filteredTickets = this.CUstomerList.filter((ticket:any) => {
    return (
      (!this.filterStatus || ticket.statusName === this.filterStatus) &&
      (!this.filterBiz ||ticket.businessName  === this.filterBiz) &&
      (!this.filterAgent || ticket.createdByName === this.filterAgent)
    );
  });

this.CUstomerList = filteredTickets;
    this.dataSource = new MatTableDataSource<any>(this.CUstomerList);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

filterAgent:any
changeAgent(agent:any){
  this.CUstomerList =  this.AllTicketsForFilter;
  this.filterAgent = agent.value;

  const filteredTickets = this.CUstomerList.filter((ticket:any) => {
    return (
      (!this.filterStatus || ticket.statusName === this.filterStatus) &&
      (!this.filterBiz ||ticket.businessName  === this.filterBiz) &&
      (!this.filterAgent || ticket.createdByName === this.filterAgent)
    );
  });

this.CUstomerList = filteredTickets;
    this.dataSource = new MatTableDataSource<any>(this.CUstomerList);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  
}




Filterchange(data:Event){
  const value = (data.target as HTMLInputElement).value;
  this.dataSource.filter =value;
  console.log("filter",this.dataSource)
}

clearAllFilter(){
  this.GetAllTickets();
  this.filterStatus = '';
  this.filterBiz = '';
  this.filterAgent = '';

}

getPromoStyles(status: any) {
  if (status == 'Ticket Pending') {
    return {
      background: '#FFFFE3',
      color: '#8F8F00',
    
    };
  }
  if (status == 'Ticket Approved') {
    return {
      background: '#E8FFE9',
      color: '#00A308',
     
    };
  }
  if (status == 'Ticket Declined') {
    return {
      background: '#FFE7E7',
      color: '#FF4747',
      
    };
  }
  return {
    background: '#000000',
    color: 'white',
  };
}




Openpopup(basicInfo:any){
  var _popup =  this.dialog.open(LeadRequestDailogComponent,{
width:'100%',
disableClose: true,
//  height:'400px',
//  enterAnimationDuration:'500ms',
//  exitAnimationDuration:'500ms',
data:{title:'Sales Ticket For Approval (Co ordinator)', basicInfo,role:'Coordinator'}

   });
   _popup.afterClosed().subscribe(item=>{
     console.log("close message for",item)
     if(item == 'cordinator'){
      this.GetAllTickets();
     }
    
     //we can refresh our function here eg:this.getdata()
   })
 }

}

