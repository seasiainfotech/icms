import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DatePipe } from '@angular/common';
import Flickity from 'flickity';
import { UsersService } from '../../services/users.service';
import { InternetConnection } from '../../Extension/internetConnection';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  public img1 = true;
  public img2 = true;
  public img3 = true;
  public img4 = true;
  public img5 = true;
  public eventId;
  public imggg;
  public imggg1;
  public imggg2;
  public imggg3;
  public imggg4;
  public newarray;
 
  image;
  thumbImage;
  image1;
  thumbImage1;
  image2;
  thumbImage2;
  image3;
  thumbImage3;
  image4;
  thumbImage4;

  
  public speakersName: any = [];

  name: string;
  arrayImage = [];
  public speakerString;
  public detailData: any = {};
  public dict = []; // create an empty array
 
  constructor(private spinner: NgxSpinnerService,private datePipe: DatePipe, private route: ActivatedRoute, private _usersService: UsersService, private _checkConnection: InternetConnection) {
    this.route.params.subscribe(params => {
      this.eventId = params['eventId'];

    });

  }

  ngOnInit() {
    window.scrollTo(0, 0)
    // intertnet Check
    this._checkConnection.online$.subscribe(value => {
      this.name = `${value}`;
      if (this.name === "true") {
       
        let id = this.eventId.split(":");
        this._usersService.getEventDetail("event/eventdetails?event_id=" + id[1] + "")
          .subscribe(data => {
            this.spinner.show();
            this.detailData = data;
            if (this.detailData.code === 200){
              setTimeout(() => {
                this.spinner.hide();
              }, 1000);
            }
            else{
              setTimeout(() => {
                this.spinner.hide();
                this._checkConnection.alert(this.detailData.message);
              }, 5000);
            }
            
            console.log("***event-detail*****", this.detailData);
            for (let entry of this.detailData.event.session) {
              var speakerNamee = "";
              for (let entry1 of entry.speakers) {
                speakerNamee = speakerNamee + ", " + entry1.name;

              }
              console.log(speakerNamee);
              speakerNamee = speakerNamee.substring(1, speakerNamee.length);
              this.speakersName.push(speakerNamee)
            }
           
            this.imggg1 = this.detailData.event.eventImage2;
            this.imggg2 = this.detailData.event.eventImage3;
            this.imggg3 = this.detailData.event.eventImage4;
            this.imggg4 = this.detailData.event.eventImage5;
            this.imggg = this.detailData.event.eventImage;
            console.log("testing...",this.detailData.event.eventImage);

               /******************** */

            if(this.imggg != null){
              this.image = this.imggg
              this.thumbImage = this.imggg 
              console.log("image present :",this.image)
            }
            else{
              this.image = "../../assets/img/no_image.png"
              this.thumbImage = "../../assets/img/no_image.png" 
              console.log("image Not present :",this.image)
            }
            if(this.imggg1 != null){
              this.image1 = this.imggg1
              this.thumbImage1 = this.imggg1 
            }
            else{
              this.image1 = "../../assets/img/no_image.png"
              this.thumbImage1 = "../../assets/img/no_image.png" 
            }
            
            if(this.imggg2 != null){
              this.image2 = this.imggg2
              this.thumbImage2 = this.imggg2 
            }
            else{
              this.image2 = "../../assets/img/no_image.png"
              this.thumbImage2 = "../../assets/img/no_image.png" 
            }

            if(this.imggg3 != null){
              this.image3 = this.imggg3
              this.thumbImage3 = this.imggg3 
            }
            else{
              this.image3 = "../../assets/img/no_image.png"
              this.thumbImage3 = "../../assets/img/no_image.png" 
            }

            if(this.imggg4 != null){
              this.image4 = this.imggg4
              this.thumbImage4 = this.imggg4 
            }
            else{
              this.image4 = "../../assets/img/no_image.png"
              this.thumbImage4 = "../../assets/img/no_image.png" 
            }
              //this.arrayImage.push(this.image);
               this.arrayImage = [
                { image: this.image, thumbImage: this.thumbImage },
                { image: this.image1, thumbImage:  this.thumbImage1 },
                { image: this.image2, thumbImage:  this.thumbImage2 },
                { image: this.image3, thumbImage: this.thumbImage3 },
                { image: this.image4, thumbImage: this.thumbImage4 },
                
            ];
              console.log("array.....",this.arrayImage)
            /******************** */ 
      
          })
      }
      else {
        
        this._checkConnection.alert("You are not connected to Internet!");
      }
    });
   // this.scrollBottomToTop();
   
  }

  convertUtc(utcDate) {
    var localDate = new Date(utcDate);
    var diffDate = this.datePipe.transform(localDate, "MMM d, y. hh:mm a")
    return diffDate;
  }

  
  public flkty = new Flickity('.main-gallery', {
    // options
    cellAlign: 'left',
    // contain: true,
    autoPlay: true,
    groupCells: true
    
  });

  scrollBottomToTop() {
    window.scrollTo(0, document.body.scrollHeight)
  }

}


