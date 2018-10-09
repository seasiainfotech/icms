import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { iEventdetail } from '../interface/eventDetail';
import { IUsers } from '../interface/users';
import { iAddGuest } from '../interface/addGuest';
import { iEmailVerification } from '../interface/emailVerification';
import { iorganiserDetail } from '../interface/organiserDetail';
import { iContactUs } from '../interface/contactUs';

@Injectable({
  providedIn: 'root'
})
 
export class UsersService {
 public organizerId = 10;
 public headers:any;
 private _url: string = "http://stgsd.appsndevs.com:9048/";
// "http://10.8.23.68:9048/";


 constructor( private _http: HttpClient) { 
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  this.headers.append('Content-Type', 'application/json');
  }

  getUsers(api_name):Observable<IUsers[]>{
    return this._http.get<IUsers[]>(this._url+api_name);
  }
  getEventDetail(api_name): Observable<iEventdetail[]> {
    console.log(this._url+api_name)
    return this._http.get<iEventdetail[]>(this._url+api_name);
  }
  postAddGuest(api_name,inputParam): Observable<iAddGuest[]>{
    console.log(inputParam);
  
    return this._http.post<iAddGuest[]>(this._url+api_name,inputParam)
    }

  emailVerify(api_name,inputParam): Observable<iEmailVerification[]>{
      console.log(inputParam);
      return this._http.post<iEmailVerification[]>(this._url+api_name,inputParam)
      }

   getOrganiserDetail(api_name):Observable<iorganiserDetail[]>{
        return this._http.get<iorganiserDetail[]>(this._url+api_name);
      }
   //   guest/contactUs
    contantUs(api_name,inputParam):Observable<iContactUs[]>{
      return this._http.post<iContactUs[]>(this._url+api_name,inputParam);
    }
  }
