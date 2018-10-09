import { Component, OnInit } from '@angular/core';

import { DatePipe } from '@angular/common';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import { InternetConnection } from '../../Extension/internetConnection';
import { NgxSpinnerService } from 'ngx-spinner';




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
  public organiserDetail:any = {};
 
  constructor(private spinner: NgxSpinnerService,private _usersService: UsersService, private datePipe: DatePipe,private _checkConnection: InternetConnection) {

  }

  ngOnInit() {
    // intertnet Check

    this._checkConnection.online$.subscribe(value => {
      this.name = `${value}`;
      if(this.name === "true"){
        console.log("ONLINE")
        this.spinner.show();
        // hitApi
         console.log("IIIIIIIIIDDDDDDDDD", this._usersService.organizerId );
        
        this._usersService.getUsers("event/event_list?organiser_id="+this._usersService.organizerId).subscribe(data => {
         
          this.res = data;
          this.dataSource = data;
          console.log("eventList :", this.dataSource)
          if (this.dataSource.code === 200){
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
          }
          else{
            setTimeout(() => {
              console.log("401");
              this.spinner.hide();
              this._checkConnection.alert(this.dataSource.message);
            }, 5000);
          }
        
        })

        this._usersService.getOrganiserDetail("organiser/organiser_profile/10").subscribe(data =>{
          this.organiserDetail = data ;
         
          sessionStorage.setItem('organizerDetail',JSON.stringify( this.organiserDetail));
          console.log("Organizer", this.organiserDetail,"name",name);
        })
      }
      else{
        console.log("OFFLINE")
        this._checkConnection.alert("You are not connected to Internet!");
      
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


