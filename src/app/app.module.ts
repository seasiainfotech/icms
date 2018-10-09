import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { RouterModule, Routes } from '@angular/router'
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { DatePipe } from '@angular/common';
import { FlickityModule } from 'ngx-flickity';

import { InternetConnection } from './Extension/internetConnection';
import { UsersService } from './services/users.service';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { PricingDetailComponent } from './components/pricing-detail/pricing-detail.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { AlertsModule } from 'angular-alert-module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { StripeComponent } from './components/stripe/stripe.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, data: {
      page: 'home'
    }
  },
  {
    path: 'eventdetail/:eventId',
    component: EventDetailComponent
  },
  {
    path: 'bookNow/:eventId',
    component: PricingDetailComponent
  },

  {
    path: 'bookingDetail/:addguest',
    component:BookingDetailsComponent
  },
  {
    path: 'stripe/:price',
    component:StripeComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventDetailComponent,
    PricingDetailComponent,
    BookingDetailsComponent,
    StripeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FlickityModule,
    HttpClientModule,
    NgImageSliderModule,
    FormsModule,
    ReactiveFormsModule,
    AlertsModule.forRoot(),
    NgxSpinnerModule,
    SwiperModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled',
    })
  ],
  
  providers: [UsersService, DatePipe, InternetConnection, {
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
