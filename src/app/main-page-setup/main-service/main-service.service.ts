import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  LIveURL = 'http://172.16.1.226:3600';
  QAURL = 'http://172.16.1.226:3700';

  URL = 'http://172.16.1.226:3700';
  constructor(private http: HttpClient) { }

  // /userLogin/getAllData
  GETAllUser() {
    let url = `${this.URL}/userlogin/getAllUsersWithBusiness`;
    return this.http.get(url);
  }

  GETRoleList() {
    let url = `${this.URL}/userRole/getAllData`;
    return this.http.get(url);
  }

  PostuserList(Obj: any) {
    let url = `${this.URL}/userLogin/postData`;
    return this.http.post(url, Obj, {
    });
  }

  
  GETManagerList() {
    let url = `${this.URL}/userLogin/getAllManagers`;
    return this.http.get(url);
  }


  GetTeamLead(Mid: any) {
    let url = `${this.URL}/userlogin/getallteamleads/${Mid}`;
    return this.http.get(url);
  }

  //Department setup
 
  GETBusienssList() {
    let url = `${this.URL}/business/getBusinessHeader`;
    return this.http.get(url);
  }

  PostCheckboxBusiness(Obj: any) {
    let url = `${this.URL}/agent-business/postdata`;
    return this.http.post(url, Obj, {
    });
  }

  // http://172.16.1.226:3600/business-stage/getAllData

   // All Stages
   GetAllStages() {
    let url = `${this.URL}/business-stage/getAllData`;
    return this.http.get(url);
  }

  // All Business
  GetAllBusiness(email: any,roleId:any) {
    let url = `${this.URL}/agent-business/getAllData/?email=${email}&roleId=${roleId}`;
    return this.http.get(url);
  }


  // USer dtail list
  GetUSerDetailedList(userId: any) {
    let url = `${this.URL}/userlogin/getemployeetree/${userId}`;
    return this.http.get(url);
  }

  ////////Business Setup Services/////////////
  PostBusinessName(Obj: any) {
   
    let url = `${this.URL}/business/postData`;
    return this.http.post(url, Obj, {
    });
  }

  GETBusinessName() {
    let url = `${this.URL}/business/getAllData`;
    return this.http.get(url);
  }


 
  PostFormlyForm(Obj: any) {

    console.log("servoce obj",Obj)
    let url = `${this.URL}/metaFormly/postdata`;
    return this.http.post(url, Obj, {
    });
  }



  GetFormlyForm(businessId: any) {
    let url = `${this.URL}/metaFormly/getDataBybizId/${businessId}`;
    return this.http.get(url);
  }


  //Ticket configurator

  PostTicketFormlyForm(Obj: any) {
    let url = `${this.URL}/bizSetupTicketFormly/PostData`;
    return this.http.post(url, Obj, {
    });
  }

  GetTicketFormlyForm(businessId: any) {
    let url = `${this.URL}/bizSetupTicketFormly/GetByBizId/${businessId}`;
    return this.http.get(url);
  }

    //Profile Configurator

    GetProfileFormlyForm(businessId: any) {
      let url = `${this.URL}/bizSetupProfileFormly/GetByBizId/${businessId}`;
      return this.http.get(url);
    }

    PostProfileFormlyForm(Obj: any) {
      let url = `${this.URL}/bizSetupProfileFormly/postData`;
      return this.http.post(url, Obj, {
      });
    }
  


  //Third party processor

  uploadFile(Obj: any) {
    let url =  `${this.URL}/upload/uploadFile`;
    return this.http.post(url, Obj, {
    });
  }

  PostbizSetupProcessorFormly(Obj:any){
    let url = `${this.URL}/bizSetupProcessorFormly/postData`;
    return this.http.post(url, Obj, {
    });
  }





  GetbizSetupProcessorFormly(businessId:number){
    let url = `${this.URL}/bizSetupProcessorFormly/GetByBizId/${businessId}`;
    return this.http.get(url);
  }

  deleteprocData(rowId:number){
    let url = `${this.URL}/bizSetupProcessorFormly/deleteDataById/${rowId}`;
    return this.http.delete(url);
  }


  // selling processor

  PostbizSetupChannelFormly(Obj:any){
    let url = `${this.URL}/bizSetupChannelFormly/postData`;
    return this.http.post(url, Obj, {
    });
  }

  GetbizSetupChannelFormly(businessId:number){
    let url = `${this.URL}/bizSetupChannelFormly/GetByBizId/${businessId}`;
    return this.http.get(url);
  }



  deletesellingData(rowId:number){
    let url = `${this.URL}/bizSetupChannelFormly/deleteDataById/${rowId}`;
    return this.http.delete(url);
  }

  // Entity

  PostbizSetupEntityFormly(Obj:any){
    let url = `${this.URL}/bizSetupEntityFormly/postData`;
    return this.http.post(url, Obj, {
    });
  }

  GetbizSetupEntityFormly(businessId:number){
    let url = `${this.URL}/bizSetupEntityFormly/GetByBizId/${businessId}`;
    return this.http.get(url);
  }


  deleteEntityData(rowId:number){
    let url = `${this.URL}/bizSetupEntityFormly/deleteDataById/${rowId}`;
    return this.http.delete(url);
  }

  //All Tickets
  // http://172.16.1.226:3600/ticket/getAllData
  GetAllTickets(){
    let url = `${this.URL}/ticket/getAllData`;
    console.log(url);
    return this.http.get(url);
  }

}
