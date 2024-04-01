import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})

export class SubjectServiceService {
  private CurrentUser$ = new BehaviorSubject<object>({});
  private CurrentRole$ = new BehaviorSubject<string>('');
  private Refresh$ = new BehaviorSubject<string>('');

  public CurrentUserFromStore() {
    return this.CurrentUser$.asObservable();
   }
 
   public setCurrentUserForStore(data:any) {
     this.CurrentUser$.next(data)
   }


  //  setCurrentRoleForStore
   public CurrentRoleFromStore() {
    return this.CurrentRole$.asObservable();
   }
 
   public setCurrentRoleForStore(data:any) {
     this.CurrentRole$.next(data)
   }


  constructor() { }
}
