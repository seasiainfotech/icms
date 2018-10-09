import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { InternetConnection } from '../../Extension/internetConnection';
import { FormBuilder, FormGroup, Validators ,FormControl,FormArray } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pricing-detail',
  templateUrl: './pricing-detail.component.html',
  styleUrls: ['./pricing-detail.component.css']
})
export class PricingDetailComponent implements OnInit {

  public totalamount;
  public totalSession = [];
  public eventId;
  public inputValue;
  public detailData: any = {};
 
  public guest:any ;
  public sessionId;
  public sId;
  public session;
  public fullEventCheckbox;
  public p_totalPrice;
public emailVerified:any;
   arraySize:number;
   prize;
   sendPrize;
   totalPize = 0;
  chechedValue :boolean;
  sessionIdArray:any ;
  item = [];
  arrayUserDetail = [];
  name: string;
  contentEditable: boolean;
  sessionEditable:boolean;
  selectedAll= true;
  emailFormArray: Array<any> = [];
  full_eventChecked: boolean;
  myForm: FormGroup;
  _name: string = '';
  _email:String;
  e_Id;
  mainEvent_id;
  ticket_type;
  buttontxt = "Verify"
  buttonColor: string = '#87cefa';
  organizerDetail;
  
 
  constructor(private spinner: NgxSpinnerService,private fb: FormBuilder,private _usersService: UsersService, private _checkConnection: InternetConnection, private route: ActivatedRoute,public router: Router) {
    this.route.params.subscribe(params => {
      this.eventId = params['eventId'];

    });

    this.organizerDetail = JSON.parse(sessionStorage.getItem('organizerDetail'));
    console.log("Org",this.organizerDetail)

  }

  ngOnInit() {
   
    this.myForm = this.fb.group({
      email: '',
      name:''
    })
  
    // intertnet Check
    this.spinner.show();
    this._checkConnection.online$.subscribe(value => {
      this.name = `${value}`;
      if (this.name === "true") {
        
        let id = this.eventId.split(":");
        this._usersService.getEventDetail("event/eventdetails?event_id=" + id[1] + "")
          .subscribe(data => {
            this.detailData = data;
            if(this.detailData.code === 200){
              setTimeout(() => {
                this.spinner.hide();
              }, 1000);
            }
            else{
              setTimeout(() => {
                this.spinner.hide();
              }, 5000);
              this._checkConnection.alert(this.detailData.message);

            }
            
            console.log('this.detailData', this.detailData);
            this.session = this.detailData.event.session;
            this.e_Id = this.detailData.event.event_id;
            this.mainEvent_id = this.detailData.event._id;
            this.ticket_type = this.detailData.ticket_type;

            console.log("mainEvent",this.mainEvent_id)

            for (var i in this.session) {
              this.session[i]['checked'] = false;
              console.log(this.session[i]);
            }

            for (var j = 0; j < this.detailData.event.session.length; j++) {
              this.detailData.event.session[j].checked = "";
              console.log("Hellowfjhfjfj")
            }
           
          })

        
      }
      else {
        setTimeout(() => {
          this.spinner.hide();
        }, 3000);
        this._checkConnection.alert("You are not connected to Internet!");
      }

    });
    this.fullEventCheckbox = false;
  }


  // add userName 

  
  get userForms() {
    return this.myForm.get('users') as FormArray
  }

  addUsers() {

    const detail = this.fb.group({ 
      name: [],
      email: []
      
    })
  
    this.userForms.push(detail);
    console.log("hha",this.userForms)
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

  performCheck = function(event, i) {
    this.prize = this.detailData.event.session[i].ticket_price;
    this.sessionId = this.detailData.event.session[i]._id;
    var ticket = this.detailData.event.session[i].total_tickets
    console.log("Prize",this.sessionId,"bbjfjfj",ticket)



  }


  fullEventClicked(event, full) {

    //check if full event checkbox checked-----------
    if (this.fullEventCheckbox === true) {
      for (const i in this.session) {
        this.session[i].checked = false;
      }
    }
    //-----------------------------------------------

    if(full==="true"){

      if ( event.target.checked ==true ) {
        this.totalamount=0;
        this.totalPize = 0;
        this.totalamount=this.detailData.event.ticket_price;
      
        console.log("clicked......TRUE");
      }
      else{
        console.log("false");
        this.totalamount=0;
        this.totalPize = 0;
      }
    }
   else{
    console.log("clicked............................false");
    this.totalamount=0;
    this.totalPize = 0;
    }

  }

  // session clicked
  sessionClicked(event, full,i) {
    // check if all checkbox checked-----------------
    let isAnyChecked = 0;
    for (const j in this.session) {
      if (this.session[j].checked === true) {
        isAnyChecked = 1;
        break;
      }
    }

    if (isAnyChecked === 1) {
      this.fullEventCheckbox = false;
      
    } else {
      this.fullEventCheckbox = true;
     
    }
    //------------------------------------------------


    if(full==="true"){
      if ( event.target.checked == true )
      {
        //  this.totalSession =  this.sessionId +'"'+ "," +'"'+ this.totalSession + '"'
        // this.sId = "["+'"'+this.totalSession + "]" 
        this.totalSession.push(this.sessionId)
        console.log("IDDDDDDD",this.totalSession,"ID",this.sId)
        this.totalPize = this.prize + this.totalPize
        this.totalamount= this.totalPize;
        console.log("clicked............................true","Total prize is:", this.totalamount);
      }
   else
   {
     this.totalSession.splice(i);
    let index = this.emailFormArray.indexOf(full);
    this.emailFormArray.splice(index,1);
    this.totalPize =  this.totalPize - this.prize
    this.totalamount= this.totalPize;
    if(this.fullEventCheckbox === true){
      this.totalamount=this.detailData.event.ticket_price;
    } 
    console.log("clicked............................false", this.totalamount,"array:",this.totalSession);
   }
 }
}

  selectAll() {
    for (var i = 0; i < this.detailData.event.session.length; i++) {
      this.detailData.event.session[i].checked = true;
      console.log("Hellowfjhfjfj")
    }
  }

  setValue() { 
  this._name;
  this.arrayUserDetail = [
    { name: this._name, email: this._email }
    ];
console.log(this._name,"email",this._email,this.arrayUserDetail)
 }

  onChange(email:string, isChecked: boolean) {
    if(isChecked) {
      this.emailFormArray.push(email);
    } else {
      let index = this.emailFormArray.indexOf(email);
      this.emailFormArray.splice(index,1);
    }
 }

 // addGuest API 
addGuest(){
   
  //var price = this.totalamount.slice(1);
  var inputParam = {
  "user_detail":this.arrayUserDetail,
  "event_id":this.e_Id,
  "sessions": this.totalSession,
  "event_main_id":this.mainEvent_id,
  "ticket_price":this.totalamount,
  "buy_total_ticket":this.inputValue,
  "ticket_type":this.ticket_type,
  "guest_type":2
  }
  sessionStorage.setItem('param',JSON.stringify(inputParam));
}


// //verify user api 

verifyUser(){
  var inputParam = {
      "email":this._email,
      "event_id":this.e_Id,
      "sessions":this.totalSession
    }
    
     console.log("emailverify",inputParam)
      this._usersService.emailVerify("guest/verifyTicket",inputParam).subscribe(data =>{
            this.emailVerified = data;
          console.log("status",this.emailVerified)

          if (this.emailVerified.code === 200){
            this.buttontxt = "Verified"
            this.buttonColor = '#81c34b';
          }
          else{
            this.buttontxt = "Not Verified"
          }
         

      })
  
} 

}
