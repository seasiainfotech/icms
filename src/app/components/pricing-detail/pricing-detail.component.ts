import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { InternetConnection } from '../../Extension/internetConnection';
import { combineAll } from 'rxjs/operators';


@Component({
  selector: 'app-pricing-detail',
  templateUrl: './pricing-detail.component.html',
  styleUrls: ['./pricing-detail.component.css']
})
export class PricingDetailComponent implements OnInit {
  public totalamount;
   arraySize:number;
   prize;
   sendPrize;
   totalPize = 0;
   chechedValue :boolean;


 //item:any[] ;
  item = [];
  name: string;
  public eventId;
  public inputValue;
  public detailData: any = {};
  public addguest:any = {};
  contentEditable: boolean;
  sessionEditable:boolean;
  selectedAll= true;
  emailFormArray: Array<any> = [];
  full_eventChecked: boolean;
  public sizes = [
    { 'size': '0', 'diameter': '16000 km' },
    { 'size': '1', 'diameter': '32000 km' }
  ];

  constructor(private _usersService: UsersService, private _checkConnection: InternetConnection, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.eventId = params['eventId'];

    });
   
  }

  ngOnInit() {
    // intertnet Check
    this._checkConnection.online$.subscribe(value => {
      this.name = `${value}`;
      if (this.name === "true") {
        let id = this.eventId.split(":");
        this._usersService.getEventDetail("eventdetails?event_id=" + id[1] + "")
          .subscribe(data => {
            this.detailData = data;
            console.log("event-detail", this.detailData);
           var session = this.detailData.event.session

           for (var i = 0; i < this.detailData.event.session.length; i++) {
      
            this.detailData.event.session[i].checked = "";
            console.log("Hellowfjhfjfj")
          }  
          //  for(var i = 0;i<= session.length;i++){
          //     this.chechedValue = session.checked
            
          //  }
          })

          //addguest
          var inputParam = {
            "buy_total_ticket": this.inputValue,
            "country_code":"",
            "email":"",
            "event_id":"",
            "event_main_id":"",
            "guest_type":"",
            "mobile":"",
            "name":"",
            "sessions":[],
            "ticket_price":"",
            "ticket_type":"",
            "userImage":""
          }

          this._usersService.postAddGuest("addGuest",inputParam).subscribe(data =>{
              this.addguest = data;
              console.log("guest",this.addguest)

          })


      }

    });
  }

  onKey(event) {
    this.inputValue = event.target.value;
    console.log("value is :",this.inputValue);
    while (this.item.length !== 0) {
      this.item.splice(0)
      console.log("remove array",this.item)
    }
  for ( let i = 1; i <= this.inputValue; i++) {
       console.log(i);
       this.item.push(i) ;
    }
   
  }

  // get session price 

  getPrize(event) {
    this.inputValue = event.target.value;
   console.log("prize:", this.inputValue)
  }

  //get UserDetail 

  getUserDetail(event) {
    this.inputValue = event.target.value;
   console.log("userDetail:", this.inputValue)
  }
  
  
  //getIndex

  getIndex = function(i){
    console.log("index",i)
    this.prize = this.detailData.event.session[i].ticket_price
    console.log(this.prize)
  }


  fullEventClicked(event,full) {
    if(full==="true"){
     
      if ( event.target.checked ==true ) {
       // this.selectAll();
       // this.full_eventChecked=true;
       // this.contentEditable = true;
        this.totalamount="$"+this.detailData.event.ticket_price;
        console.log("clicked......");
       // this.chechedValue = false
       for(let i = 0;i <= this.emailFormArray.length;i++){
          // this.sessionClicked(event,false)
          
       }
       
   }else{
    console.log("clicked............................false");
    this.totalamount="";
     
  //  this.chechedValue = true
    //this.full_eventChecked=false;;
   }
    }
    
  }

  // session clicked
  sessionClicked(event, full) {
    if(full==="true"){
      if ( event.target.checked ==true ) {
      //  this.full_eventChecked=false;
      //  this.sessionEditable = true;
        this.totalPize = this.prize + this.totalPize
        this.totalamount="$"+this.totalPize;
        this.emailFormArray.push(full);
      
        console.log("clicked............................true","Total prize is:",this.emailFormArray);
   }else{
    console.log("clicked............................false",this.emailFormArray);
    let index = this.emailFormArray.indexOf(full);
    this.emailFormArray.splice(index,1);
    this.totalPize =  this.totalPize - this.prize 
    this.totalamount= this.totalPize;
   // this.sessionEditable = false;
   }
    }
  }
 
  selectAll() {
    for (var i = 0; i < this.detailData.event.session.length; i++) {
      
      this.detailData.event.session[i].checked = true;
      console.log("Hellowfjhfjfj")
    }  
  }

  onChange(email:string, isChecked: boolean) {
    if(isChecked) {
      this.emailFormArray.push(email);
    } else {
      let index = this.emailFormArray.indexOf(email);
      this.emailFormArray.splice(index,1);
    }
}

 

}
