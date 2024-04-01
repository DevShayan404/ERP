import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class SaleSubjectService {

// Send CurrentBusinessObj from lead-info to lead-info-remarks
  private CurrentBusiness$ = new BehaviorSubject<object>({});

  public CurrentBusinessFromStore() {
    return this.CurrentBusiness$.asObservable();
   }
 
   public setCurrentBusinessForStore(data:any) {
     this.CurrentBusiness$.next(data);
   }


  // allticketStorage(ticket: any){
  //   localStorage.setItem('ticket', JSON.stringify(ticket));
  // }

  // private ticket$ = new BehaviorSubject<object>({});

  // public TicketFromStore() {
  //   return this.ticket$.asObservable();
  //  }
 
  //  public setTicketsForStore(data:any) {
  //    this.ticket$.next(data)
  //    console.log("subjectservice",data)
  //  }
  constructor() { }
}
