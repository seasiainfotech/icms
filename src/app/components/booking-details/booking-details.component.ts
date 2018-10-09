import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  userDetail;
     

  constructor(private spinner: NgxSpinnerService) {
    spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000)
    this.userDetail = JSON.parse(sessionStorage.getItem('user'));
      console.log("data:", this.userDetail);
    
   }

  ngOnInit() {
   
  }

  // print page 

  printComponent(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

}
