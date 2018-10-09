import { Component,ChangeDetectorRef, AfterViewInit, OnDestroy,
  ViewChild,ElementRef} from '@angular/core';
  import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'angular-alert-module';
import { UsersService } from '../../services/users.service';
import { InternetConnection } from '../../Extension/internetConnection';
  
  declare var stripe: any;
  declare var elements: any;
  

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements AfterViewInit,OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  card: any;
  price ;
  organizerDetail;
  public addguest:any = {};
  cardHandler = this.onChange.bind(this);
  error: string;
  constructor(private _checkConnection: InternetConnection,private _usersService: UsersService,public router: Router,private alerts: AlertsService,private spinner: NgxSpinnerService,private cd: ChangeDetectorRef, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      let total_price = params['price'];
    //  this.price = total_price.split(":");
      this.price = total_price.replace(/^:+/, '')
      console.log("PRICE****",this.price)

    });
    this.organizerDetail = JSON.parse(sessionStorage.getItem('organizerDetail'));
    console.log("Org",this.organizerDetail)

  }
  
  ngAfterViewInit() {
 
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
    }
    
    ngOnDestroy() {
     
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
    }
    
    onChange({ error }) {
    if (error) {
    this.error = error.message;
    } else {
    this.error = null;
    }
    this.cd.detectChanges();
    }
    
    async onSubmit(form: NgForm) {
    const { token, error } = await stripe.createToken(this.card);
    
    if (error) {
    console.log('Something is wrong:', error);
    } else {
    console.log('Payment Success!', token);
    this._checkConnection.alert("Your payment has been successfully done!")
    // ...send the token to the your backend to process the charge
    this.addGuest()
    }
    }


    // buyticket 

    addGuest(){

      let inputParam = JSON.parse(sessionStorage.getItem('param'));
      console.log("PARAM****:",inputParam)
    
      this.spinner.show();
       console.log("param",inputParam)
        this._usersService.postAddGuest("guest/buyTicket",inputParam).subscribe(data =>{
            this.addguest = data;
            console.log("guest",this.addguest)
            if(this.addguest.code === 200){
            
              this._checkConnection.alert('Configurations saved successfully!');
              setTimeout(() => {
                this.spinner.hide();
              }, 1000)
          
    
          sessionStorage.setItem('user',JSON.stringify(this.addguest));
    
              this.router.navigate(['/bookingDetail/:']);
            }
            else{
                setTimeout(() => {
                  this.spinner.hide();
                }, 5000);
              
              this._checkConnection.alert('All the fields are required');
              console.log("error")
              }
        })
    
    }
    
    }
    
 

