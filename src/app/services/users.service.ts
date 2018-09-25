import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import { iEventdetail } from '../interface/eventDetail';
import { IUsers } from '../interface/users';
import { iAddGuest } from '../interface/addGuest';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 
 private _url: string = "http://stgsd.appsndevs.com:9048/event/";
 private _guesturl:string = "http://stgsd.appsndevs.com:9048/guest/";
  constructor( private _http: HttpClient) { }

  getUsers(api_name):Observable<IUsers[]>{
    return this._http.get<IUsers[]>(this._url+api_name);
  }
  getEventDetail(api_name): Observable<iEventdetail[]> {
    console.log(this._url+api_name)
    return this._http.get<iEventdetail[]>(this._url+api_name);
  }
  postAddGuest(api_name,inputParam): Observable<iAddGuest[]>{
   
    return this._http.post<iAddGuest[]>(this._guesturl+api_name,inputParam)
    }
}



