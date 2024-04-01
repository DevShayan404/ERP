import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  URL = 'http://172.16.1.226:3600';
  constructor(private http: HttpClient) { }


  Getproposal(Bid: any) {
    let url = `${this.URL}/proposal/getDataById/${Bid}`;
    return this.http.get(url);
  }

  Insertproposal(Obj: any) {
    let url = `${this.URL}/proposal/postData`;
    return this.http.post(url, Obj, {
    });
  }
}
