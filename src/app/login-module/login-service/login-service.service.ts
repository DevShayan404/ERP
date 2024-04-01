import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  LIveURL = 'http://172.16.1.226:3600';
  QAURL = 'http://172.16.1.226:3700';

  URL = 'http://172.16.1.226:3700';
  constructor(private http: HttpClient) { }

  login(Obj: any) {
    let url = `${this.URL}/userLogin/validateUser`;
    return this.http.post(url, Obj, {
    });
  }
}
