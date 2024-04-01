import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { remarksModel } from '../Sales-models/remarksModel';
import { BehaviorSubject, Observable } from 'rxjs';

interface list  {
  businessId:number;
  business:string;
}
@Injectable({
  providedIn: 'root'
})
export class SaleLeadService {
  LIveURL = 'http://172.16.1.226:3600';
  QAURL = 'http://172.16.1.226:3700';

  URL = 'http://172.16.1.226:3700';
  EmailURL = 'http://172.16.100.111:7060'
  constructor(private http: HttpClient) { }


  GETSaleLeadForm(LoginId:any) {
    let url = `${this.URL}/sales-lead/getLeadsByUserId/${LoginId}`;
    return this.http.get(url);
  }


  InsertSaleLeadForm(Obj: any) {
    let url = `${this.URL}/sales-Lead/postData`;
    return this.http.post(url, Obj, {
    });
  }


  getBusinessDropdown(LoginId:any): Observable<list>{
    let url = `${this.URL}/agent-business/getAgentBizList/${LoginId}`;
    return this.http.get<list>(url);
  }

  getStatusDropdown(): Observable<list>{
    let url = `${this.URL}/lead-status/getAllData`;
    return this.http.get<list>(url);
  }


  GetFormlyForm(businessId: any) {
    let url = `${this.URL}/metaFormly/getDataBybizId/${businessId}`;
    return this.http.get(url);
  }

  GetDashboardStatusList(userLoginId: any) {
    let url = `${this.URL}/sales-lead/GetAgentDashboardData/${userLoginId}`;
    return this.http.get(url);
  }

  GetUserLeadsByStatus(userId: any,statusId:any,businessId:any) {
    let url = `${this.URL}/sales-lead/GetUserLeadsByStatus/?userId=${userId}&statusId=${statusId}&businessId=${businessId}`;
    return this.http.get(url);
  }

    GetUserTickets(agentID:number,businessId:number,statusId:number) {
      let url = `${this.URL}/ticket/getDataByAgentBusinessId/?agentId=${agentID}&businessId=${businessId}&statusId=${statusId}`;
      return this.http.get(url);
    }

  GetUserLeadsBydateRange(userId:any,fdate: any,tdate:any) {
    let url = `${this.URL}/sales-lead/getUserLeadsByDate/?userId=${userId}&fdate=${fdate}&tdate=${tdate}`;
    console.log("range",url)
    return this.http.get(url);
  }


  GetBasicInfo(LeadGroupNo: any) {
    let url = `${this.URL}/sales-lead/getLeadsByGroupNumber/${LeadGroupNo}`;
    return this.http.get(url);
  }

  //lead-info-page end//

  //lead remark-page  // 
  GetAllRemarks(leadId:number,businessId:number){
    let url = `${this.URL}/followup-remark/getAllData/?leadId=${leadId}&businessId=${businessId}`;
    return this.http.get(url);
  }

  InsertLeadRemarks(Obj: remarksModel) {
    let url = `${this.URL}/followup-remark/postData`;
    return this.http.post(url, Obj, {
    });
  }

  //lead-Remarks end

  //Ticket Dialogue 
  GetbizSetupTicketFormly(businessId:number){
    let url = `${this.URL}/bizSetupTicketFormly/GetByBizId/${businessId}`;
    return this.http.get(url);
  }

  InsertTicketPostData(Obj: any) {
    let url = `${this.URL}/ticket/PostData`;
    return this.http.post(url, Obj, {
    });
  }

  updateLeadStatus(leadId:number,businessId:number,statusId:number,remark:string){
    let url = `${this.URL}/sales-lead/updateLeadStatusForTicket/?leadId=${leadId}&businessId=${businessId}&statusId=${statusId}&remark=${remark}`;
    return this.http.get(url);
  }

  // /queryForDuplicateTickets
  InsertDuplicateTicket(Obj: any) {
    let url = `${this.URL}/ticket/queryForDuplicateTickets`;
    return this.http.post(url, Obj, {
    });
  }

  //proposal preparation
  
  
  GetEntity(Bid: any) {
    let url = `${this.URL}/bizSetupEntityFormly/GetByBizId/${Bid}`;
    return this.http.get(url);
  }


  GetSetupChannel(Bid: any) {
    let url = `${this.URL}/bizSetupChannelFormly/GetByBizId/${Bid}`;
    return this.http.get(url);
  }


  GetbizSetupProcessor(Bid: any) {
    let url = `${this.URL}/bizSetupProcessorFormly/GetByBizId/${Bid}`;
    return this.http.get(url);
  }

  // /proposal/postData
  Insertproposal(Obj: any) {
    let url = `${this.URL}/proposal/postData`;
    return this.http.post(url, Obj, {
    });
  }

  Getproposal(Bid: any) {
    let url = `${this.URL}/proposal/getDataById/${Bid}`;
    return this.http.get(url);
  }


  sendMailToClient(Obj:any){
    let url = `${this.EmailURL}/mailer/sendEmail`;
    return this.http.post(url, Obj, {
    });
  }



}
