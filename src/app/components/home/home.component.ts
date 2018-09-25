import { Component, OnInit } from '@angular/core';

import { DatePipe } from '@angular/common';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import { InternetConnection } from '../../Extension/internetConnection';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  localDate: any;
  public dataSource;
  public res: any = {};
  name: string;
 
  constructor(private _usersService: UsersService, private datePipe: DatePipe,private _checkConnection: InternetConnection) {

  }

  ngOnInit() {
    // intertnet Check
    this._checkConnection.online$.subscribe(value => {
      this.name = `${value}`;
      if(this.name === "true"){
        console.log("ONLINE")

        // hitApi
        this._usersService.getUsers("event_list").subscribe(data => {
          this.res = data;
          this.dataSource = data;
        })
      }
      else{
        console.log("OFFLINE")
        this._checkConnection.internetAlert();
      }
  });
}

  convertToUtcDate(utcDate){
    var localDate = new Date(utcDate);
    var diffDate = this.datePipe.transform(localDate,"yyyy-MM-dd")
    return diffDate;
  } 
  
  convertToUtcTime(utcDate){
    var localDate = new Date(utcDate);
    var diffDate = this.datePipe.transform(localDate,"hh:mm:ss a")
    return diffDate;
  } 
 
}


