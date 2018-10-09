import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { InternetConnection } from './Extension/internetConnection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'icms';
  model;
  message;
  validEmail:boolean = false
  _email;
  _name;
  _message;
  organizerDetail;
  constructor(private _usersService: UsersService,private _checkConnection:InternetConnection){ 
    this.organizerDetail = JSON.parse(sessionStorage.getItem('organizerDetail'));
    console.log("Org",this.organizerDetail)
  }
  
  onActivate(event) {
    window.scroll(0,0);
}
  scrollToBottom() {
    window.scrollTo(0,document.body.scrollHeight)
  }

  // contactUs Api

  contactUs(){
    var inputParam = {
        "organiserEmail":this.organizerDetail.organiser.email,
        "userEmail":this._email,
        "message":this._message,
        "userName":this._name
      }

       console.log("param",inputParam)
        this._usersService.contantUs("guest/contactUs",inputParam).subscribe(data =>{
              this.message = data;
            console.log("status",this.message)
  
            if (this.message.code === 200){
              this._checkConnection.alert("Mail sent sucessfully!")
            }
            else{
              this._checkConnection.alert("Error")
            }
           
  
        })
    
  } 
//onsubmit
  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }

  // email verification

  setValue() { 
    if (this._email != '') {
      console.log(this._email);
    }
    else{
      this._checkConnection.alert("email is require")
    }
  this._name;
  this._email;
  this.message
  console.log("email",this._email)
   }

  onChange(newValue) {
    const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validEmailRegEx.test(newValue)) {
        this.validEmail = true;
      

    }else {
      this.validEmail = false;
      this._checkConnection.alert("mail is not correct")
    }

  }

  textAreaEmpty(){
    if (this._email != '') {
      console.log(this._email);
    }
    else{
      this._checkConnection.alert("email is require")
    }
  }

  //
}

